// backend/src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/api/calculate", (req: Request, res: Response): void => {
  const { venueName, capacity, rent, ticketPrice } = req.body as {
    venueName?: string;
    capacity?: number;
    rent?: number;
    ticketPrice?: number;
  };

  if (
    typeof capacity !== "number" ||
    typeof rent !== "number" ||
    typeof ticketPrice !== "number"
  ) {
    res.status(400).json({ error: "Missing or invalid input fields" });
    return;
  }

  const projectedRevenue = capacity * ticketPrice;
  const projectedProfit = projectedRevenue - rent;

  res.json({ venueName, revenue: projectedRevenue, profit: projectedProfit });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
