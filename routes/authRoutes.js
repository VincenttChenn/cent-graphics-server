import express from 'express';
import { login, signup, getSavedPalettes } from '../controllers/authController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', signup);
router.get('/saved', auth, getSavedPalettes);

export default router;