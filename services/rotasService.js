import { readJson, writeJson } from '../utils/fileUtils.js';
const filePath = './data/rotas.json';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rotasPath = path.join(__dirname, '../data/rotas.json');

export async function adicionarRota(rota) {
  const lista = await readJson(rotasPath);
  lista.push(rota);
  await writeJson(rotasPath, lista);
}

export async function listarRotas() {
  return readJson(rotasPath);
}