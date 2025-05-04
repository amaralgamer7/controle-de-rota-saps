import { readJson, writeJson } from '../utils/fileUtils.js';
import path from 'path';
const filePath = './data/veiculos.json';

export async function listarVeiculos() {
  return await readJson(filePath);
}

export async function adicionarVeiculo(veiculo) {
  const veiculos = await readJson(filePath);
  veiculo.id = Date.now();
  veiculos.push(veiculo);
  await writeJson(filePath, veiculos);
  return veiculo;
}

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Caminho do arquivo JSON onde os veículos serão armazenados
const veiculosPath = path.join(__dirname, '../veiculos.json');

// Função para ler o arquivo de veículos
async function lerVeiculos() {
  try {
    const data = await fs.readFile(veiculosPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // Se o arquivo não existir, retorna um array vazio
    return [];
  }
}

// Função para cadastrar veículo
export async function cadastrarVeiculo(req, res) {
  const { placa, modelo, marca, ano, capacidade } = req.body;

  // Validação simples dos dados recebidos
  if (!placa || !modelo || !marca || !ano || !capacidade) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  try {
    // Ler os veículos existentes no arquivo
    const veiculos = await lerVeiculos();

    // Criar um novo veículo
    const novoVeiculo = { placa, modelo, marca, ano, capacidade };

    // Adicionar o novo veículo ao array
    veiculos.push(novoVeiculo);

    // Salvar o array atualizado de veículos no arquivo
    await fs.writeFile(veiculosPath, JSON.stringify(veiculos, null, 2));

    res.status(201).json({ message: 'Veículo cadastrado com sucesso!', veiculo: novoVeiculo });
  } catch (error) {
    console.error('Erro ao cadastrar veículo:', error);
    res.status(500).json({ error: 'Erro ao salvar veículo.' });
  }
}
