import express from 'express';
import { listarMotoristas, adicionarMotorista } from '../services/motoristasService.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const data = await listarMotoristas();
  res.json(data);
});

router.post('/', async (req, res) => {
  const novo = await adicionarMotorista(req.body);
  res.status(201).json(novo);
});

router.post('/', async (req, res) => {
  try {
    await adicionarMotorista(req.body);
    res.status(201).json({ mensagem: 'Motorista cadastrado!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const motoristas = await listarMotoristas();
    res.json(motoristas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router;