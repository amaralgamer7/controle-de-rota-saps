import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import fs from 'fs/promises';
import { listarAbastecimentos } from './abastecimentosService.js';
import { listarRotas } from './rotasService.js';

async function carregarNomes() {
  const veiculos = JSON.parse(await fs.readFile('./data/veiculos.json', 'utf-8'));
  const motoristas = JSON.parse(await fs.readFile('./data/motoristas.json', 'utf-8'));
  return { veiculos, motoristas };
}

function filtrarDados(dados, inicio, fim, veiculo, motorista) {
  const dataInicio = inicio ? new Date(inicio) : null;
  const dataFim = fim ? new Date(fim) : null;

  return dados.filter(item => {
    const dataItem = new Date(item.data);
    if (dataInicio && dataItem < dataInicio) return false;
    if (dataFim && dataItem > dataFim) return false;
    if (veiculo && item.veiculoId !== veiculo) return false;
    if (motorista && item.motoristaId !== motorista) return false;
    return true;
  });
}

function substituirIdsPorNomes(dados, veiculos, motoristas) {
  return dados.map(item => {
    const veiculo = veiculos.find(v => v.id === item.veiculoId);
    const motorista = motoristas.find(m => m.id === item.motoristaId);
    const km = item.kmFinal && item.kmInicial ? item.kmFinal - item.kmInicial : null;
    const consumoMedio = km && item.litros ? (km / item.litros).toFixed(2) : null;
    return {
      ...item,
      veiculo: veiculo ? veiculo.modelo : item.veiculoId,
      motorista: motorista ? motorista.nome : item.motoristaId,
      kmPercorrido: km,
      consumoMedio
    };
  });
}

function calcularResumo(dados) {
  const totalKm = dados.reduce((acc, item) => acc + (item.kmPercorrido || 0), 0);
  const totalLitros = dados.reduce((acc, item) => acc + (item.litros || 0), 0);
  const mediaConsumo = totalLitros > 0 ? (totalKm / totalLitros).toFixed(2) : 'N/A';
  return { totalKm, totalLitros, mediaConsumo };
}

export async function exportarRelatorioPDF(tipo, res, inicio, fim, veiculo, motorista) {
  const doc = new PDFDocument();
  doc.pipe(res);
  doc.fontSize(18).text(`Relatório de ${tipo}`, { underline: true });

  let dados = tipo === 'abastecimentos' ? await listarAbastecimentos() : await listarRotas();
  const { veiculos, motoristas } = await carregarNomes();

  dados = filtrarDados(dados, inicio, fim, veiculo, motorista);
  dados = substituirIdsPorNomes(dados, veiculos, motoristas);

  dados.forEach((item, i) => {
    doc.moveDown().fontSize(12).text(`${i + 1}. ${JSON.stringify(item)}`);
  });

  const resumo = calcularResumo(dados);
  doc.addPage().fontSize(14).text('Resumo Final', { underline: true }).moveDown();
  doc.fontSize(12).text(`Total Km: ${resumo.totalKm}`);
  doc.text(`Total Litros: ${resumo.totalLitros}`);
  doc.text(`Consumo Médio Total: ${resumo.mediaConsumo} km/l`);

  doc.end();
}

export async function exportarRelatorioExcel(tipo, res, inicio, fim, veiculo, motorista) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(`Relatório de ${tipo}`);

  let dados = tipo === 'abastecimentos' ? await listarAbastecimentos() : await listarRotas();
  const { veiculos, motoristas } = await carregarNomes();

  dados = filtrarDados(dados, inicio, fim, veiculo, motorista);
  dados = substituirIdsPorNomes(dados, veiculos, motoristas);

  if (dados.length === 0) return workbook.xlsx.write(res);

  sheet.columns = Object.keys(dados[0]).map(key => ({ header: key, key }));
  dados.forEach(row => sheet.addRow(row));

  const resumo = calcularResumo(dados);
  sheet.addRow([]);
  sheet.addRow(['Resumo']);
  sheet.addRow(['Total Km', resumo.totalKm]);
  sheet.addRow(['Total Litros', resumo.totalLitros]);
  sheet.addRow(['Consumo Médio Total (km/l)', resumo.mediaConsumo]);

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=${tipo}.xlsx`);

  await workbook.xlsx.write(res);
  res.end();
}
