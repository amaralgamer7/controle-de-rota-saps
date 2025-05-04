import express from 'express';
import { exportarRelatorioPDF, exportarRelatorioExcel } from '../services/exportService.js';
const router = express.Router();

router.get('/pdf/:tipo', async (req, res) => {
  const { tipo } = req.params;
  const { inicio, fim, veiculo, motorista } = req.query;
  res.setHeader('Content-Type', 'application/pdf');
  await exportarRelatorioPDF(tipo, res, inicio, fim, veiculo, motorista);
});

router.get('/excel/:tipo', async (req, res) => {
  const { tipo } = req.params;
  const { inicio, fim, veiculo, motorista } = req.query;
  await exportarRelatorioExcel(tipo, res, inicio, fim, veiculo, motorista);
});

export default router;
