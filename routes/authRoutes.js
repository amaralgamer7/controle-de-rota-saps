import express from 'express';
import { cadastrar, logar } from '../auth/authController.js';

const router = express.Router();

router.post('/cadastro', cadastrar);
router.post('/login', logar);

export default router;
