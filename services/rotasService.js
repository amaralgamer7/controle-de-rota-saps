import fs from 'fs/promises';
const caminhoRotas = './data/rotas.json';
const caminhoMotoristas = './data/motoristas.json';
const caminhoVeiculos = './data/veiculos.json';

export async function listarRotas() {
  const dados = await fs.readFile(caminhoRotas, 'utf-8');
  return JSON.parse(dados);
}

export async function adicionarRota(rota) {
  const motoristas = JSON.parse(await fs.readFile(caminhoMotoristas, 'utf-8'));
  const veiculos = JSON.parse(await fs.readFile(caminhoVeiculos, 'utf-8'));
  const rotas = await listarRotas();

  const motorista = motoristas.find(m => m.id === rota.motoristaId);
  const veiculo = veiculos.find(v => v.placa === rota.placa);

  const novaRota = {
    ...rota,
    motorista: motorista || null,
    veiculo: veiculo || null,
  };

  rotas.push(novaRota);
  await fs.writeFile(caminhoRotas, JSON.stringify(rotas, null, 2));
}
