import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
import userRoutes from './routes/auth';
import simulationRouter from './routes/simulation';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/simulations', simulationRouter);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});
