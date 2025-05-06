import express from 'express';
import {
  listarMotoristas,
  adicionarMotorista,
  obterMotoristaPorId,
  atualizarMotorista,
  excluirMotorista
} from '../services/motoristasService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const motoristas = await listarMotoristas();
    res.json(motoristas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    await adicionarMotorista(req.body);
    res.status(201).json({ mensagem: 'Motorista cadastrado!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const motorista = await obterMotoristaPorId(Number(req.params.id));
    if (!motorista) return res.status(404).json({ erro: 'Motorista não encontrado' });
    res.json(motorista);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await atualizarMotorista(Number(req.params.id), req.body);
    res.json({ mensagem: 'Motorista atualizado!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await excluirMotorista(Number(req.params.id));
    res.json({ mensagem: 'Motorista excluído!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router;
