import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersPath = path.join(__dirname, 'users.json');

async function lerUsuarios() {
  try {
    const dados = await fs.readFile(usersPath, 'utf-8');
    return JSON.parse(dados);
  } catch {
    return [];
  }
}

async function salvarUsuarios(usuarios) {
  await fs.writeFile(usersPath, JSON.stringify(usuarios, null, 2));
}

export async function cadastrarUsuario(email, senha) {
  const usuarios = await lerUsuarios();
  if (usuarios.find(u => u.email === email)) {
    throw new Error('Usuário já existe');
  }

  const hash = await bcrypt.hash(senha, 10);
  usuarios.push({ email, senha: hash });
  await salvarUsuarios(usuarios);
}

export async function autenticarUsuario(email, senha) {
  const usuarios = await lerUsuarios();
  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) throw new Error('Usuário não encontrado');

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) throw new Error('Senha inválida');

  return jwt.sign({ email }, 'secreta', { expiresIn: '1h' });
}
