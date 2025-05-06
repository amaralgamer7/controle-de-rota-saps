import { cadastrarUsuario, autenticarUsuario } from './authService.js';

export async function cadastrar(req, res) {
  const { email, senha } = req.body;
  try {
    await cadastrarUsuario(email, senha);
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } catch (erro) {
    res.status(400).json({ message: erro.message });
  }
}

export async function logar(req, res) {
  const { email, senha } = req.body;
  try {
    const token = await autenticarUsuario(email, senha);
    res.status(200).json({ token });
  } catch (erro) {
    res.status(401).json({ message: erro.message });
  }
}
