import { Router, Request, Response } from 'express';
import { register, login } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', authenticate, (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: number } }).user;
  res.json({ message: 'You are authenticated!', user });
});

export default router;
