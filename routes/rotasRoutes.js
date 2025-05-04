import express from 'express';
import { listarRotas, adicionarRota } from '../services/rotasService.js';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await adicionarRota(req.body);
    res.status(201).send({ mensagem: 'Rota registrada com sucesso.' });
  } catch (err) {
    res.status(500).send({ erro: 'Erro ao registrar rota.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const lista = await listarRotas();
    res.send(lista);
  } catch (err) {
    res.status(500).send({ erro: 'Erro ao listar rotas.' });
  }
});


export default router;