import { Router } from "express";
import { authenticate } from '../middleware/auth';
import { createSimulation, listSimulations } from '../controllers/simulationController';

const router = Router();

router.post('/', authenticate, createSimulation);
router.get('/', authenticate, listSimulations);

export default router;