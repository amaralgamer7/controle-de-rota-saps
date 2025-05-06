import fs from 'fs/promises';

const caminhoAbastecimentos = './data/abastecimentos.json';
const caminhoVeiculos = './data/veiculos.json';
const caminhoMotoristas = './data/motoristas.json'; // Adicionando o caminho para o arquivo de motoristas

export async function listarAbastecimentos() {
  const dados = await fs.readFile(caminhoAbastecimentos, 'utf-8');
  return JSON.parse(dados);
}

export async function adicionarAbastecimento(abastecimento) {
  const abastecimentos = await listarAbastecimentos();

  // Buscar veículo correspondente pela placa
  const veiculos = JSON.parse(await fs.readFile(caminhoVeiculos, 'utf-8'));
  const veiculo = veiculos.find(v => v.placa === abastecimento.placa);

  // Buscar motorista pelo nome
  const motoristas = JSON.parse(await fs.readFile(caminhoMotoristas, 'utf-8'));
  const motorista = motoristas.find(m => m.nome === abastecimento.motorista);

  const novoAbastecimento = {
    ...abastecimento,
    km: Number(abastecimento.km),
    litros: Number(abastecimento.litros),
    veiculo: veiculo || null,
    motorista: motorista || null,
  };

  abastecimentos.push(novoAbastecimento);

  await fs.writeFile(caminhoAbastecimentos, JSON.stringify(abastecimentos, null, 2));
}
