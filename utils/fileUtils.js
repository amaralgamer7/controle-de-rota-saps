import { readFile, writeFile } from 'fs/promises';

export async function readJson(path) {
  const data = await readFile(path, 'utf8');
  return JSON.parse(data || '[]');
}

export async function writeJson(path, data) {
  await writeFile(path, JSON.stringify(data, null, 2));
}