import { readJson, writeJson } from '../utils/fileUtils.js';
const filePath = './data/abastecimentos.json';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const abastecimentoPath = path.join(__dirname, '../data/abastecimentos.json');

export async function adicionarAbastecimento(dado) {
  const lista = await readJson(abastecimentoPath);
  lista.push(dado);
  await writeJson(abastecimentoPath, lista);
}

export async function listarAbastecimentos() {
  return readJson(abastecimentoPath);
}
