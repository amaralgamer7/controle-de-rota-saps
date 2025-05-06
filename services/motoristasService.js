import fs from 'fs/promises';
const caminhoMotoristas = './data/motoristas.json';

export async function listarMotoristas() {
  const dados = await fs.readFile(caminhoMotoristas, 'utf-8');
  return JSON.parse(dados);
}

export async function adicionarMotorista(novoMotorista) {
  const motoristas = await listarMotoristas();

  const motoristaComId = {
    id: Date.now(), // Gera um ID numérico único
    ...novoMotorista
  };

  motoristas.push(motoristaComId);
  await fs.writeFile(caminhoMotoristas, JSON.stringify(motoristas, null, 2));
}

export async function obterMotoristaPorId(id) {
  const motoristas = await listarMotoristas();
  return motoristas.find(m => m.id === id);
}

export async function atualizarMotorista(id, dadosAtualizados) {
  const motoristas = await listarMotoristas();
  const index = motoristas.findIndex(m => m.id === id);
  if (index === -1) throw new Error('Motorista não encontrado');

  motoristas[index] = { id, ...dadosAtualizados };
  await fs.writeFile(caminhoMotoristas, JSON.stringify(motoristas, null, 2));
}

export async function excluirMotorista(id) {
  const motoristas = await listarMotoristas();
  const atualizados = motoristas.filter(m => m.id !== id);
  if (motoristas.length === atualizados.length) throw new Error('Motorista não encontrado');

  await fs.writeFile(caminhoMotoristas, JSON.stringify(atualizados, null, 2));
}
