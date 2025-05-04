import express from 'express';
import { listarAbastecimentos, adicionarAbastecimento } from '../services/abastecimentosService.js';
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    await adicionarAbastecimento(req.body);
    res.status(201).send({ mensagem: 'Abastecimento registrado com sucesso.' });
  } catch (err) {
    res.status(500).send({ erro: 'Erro ao registrar abastecimento.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const lista = await listarAbastecimentos();
    res.send(lista);
  } catch (err) {
    res.status(500).send({ erro: 'Erro ao listar abastecimentos.' });
  }
});

export default router;