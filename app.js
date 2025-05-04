import express from 'express';
import veiculosRoutes from './routes/veiculosRoutes.js';
import motoristasRoutes from './routes/motoristasRoutes.js';
import abastecimentosRoutes from './routes/abastecimentosRoutes.js';
import rotasRoutes from './routes/rotasRoutes.js';
import exportRoutes from './routes/exportRoutes.js';

const app = express();
app.use(express.json());
import cors from 'cors';
app.use(cors());

app.use('/veiculos', veiculosRoutes);
app.use('/motoristas', motoristasRoutes);
app.use('/abastecimentos', abastecimentosRoutes);
app.use('/rotas', rotasRoutes);
app.use('/exportar', exportRoutes);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});