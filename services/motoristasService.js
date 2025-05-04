import { readJson, writeJson } from '../utils/fileUtils.js';
const filePath = './data/motoristas.json';
import path from 'path';
import { fileURLToPath } from 'url';

// export async function listarMotoristas() {
//   return await readJson(filePath);
// }

// export async function adicionarMotorista(motorista) {
//   const motoristas = await readJson(filePath);
//   motorista.id = Date.now();
//   motoristas.push(motorista);
//   await writeJson(filePath, motoristas);
//   return motorista;
// }

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const motoristasPath = path.join(__dirname, '../data/motoristas.json');

export async function adicionarMotorista(motorista) {
  const lista = await readJson(motoristasPath);
  lista.push(motorista);
  await writeJson(motoristasPath, lista);
}

export async function listarMotoristas() {
  return readJson(motoristasPath);
}
