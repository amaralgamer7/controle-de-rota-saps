import express from 'express';
import { listarVeiculos, adicionarVeiculo, cadastrarVeiculo } from '../services/veiculosService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await listarVeiculos();
  res.json(data);
});

router.post('/', async (req, res) => {
  const novo = await adicionarVeiculo(req.body);
  res.status(201).json(novo);
});

router.post('/', cadastrarVeiculo);


export default router;