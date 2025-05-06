import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import veiculosRoutes from './routes/veiculosRoutes.js';
import motoristasRoutes from './routes/motoristasRoutes.js';
import abastecimentosRoutes from './routes/abastecimentosRoutes.js';
import rotasRoutes from './routes/rotasRoutes.js';
import exportRoutes from './routes/exportRoutes.js';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve arquivos da pasta public

app.use('/veiculos', veiculosRoutes);
app.use('/motoristas', motoristasRoutes);
app.use('/abastecimentos', abastecimentosRoutes);
app.use('/rotas', rotasRoutes);
app.use('/exportar', exportRoutes);
app.use('/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
