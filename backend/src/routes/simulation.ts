import { Router, Request, Response } from "express";

const router = Router();

router.post("/calculate", (req: Request, res: Response) => {
  const { venueName, capacity, rent, ticketPrice } = req.body;

  if (!capacity || !rent || !ticketPrice) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const profit = capacity * ticketPrice - rent;
  res.json({ venueName, profit });
});

export default router;
