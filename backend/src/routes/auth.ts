import { Router, Request, Response } from 'express';
import { register, login } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// No extra typing on req/res here – use default Request/Response
router.get('/me', authenticate, (req: Request, res: Response) => {
  // Cast req to include `user`, since our middleware sets it
  const user = (req as Request & { user: { id: number } }).user;
  res.json({ message: 'You are authenticated!', user });
});

export default router;
