import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { calculateROI } from '../utils/calc';

export const createSimulation = async (req: Request, res: Response) => {
  try {
    const userId = (req as Request & { user: { id: number } }).user.id;

    const {
      title,
      venueCapacity,
      expectedAttendance,
      ticketPrice,
      artistFee,
      gearCost,
      marketingBudget,
      barSplitPercent,
      totalBarSales,
    } = req.body;

    const results = calculateROI(
      ticketPrice,
      expectedAttendance,
      artistFee,
      gearCost,
      marketingBudget,
      barSplitPercent,
      totalBarSales
    );

    const sim = await prisma.simulation.create({
      data: {
        userId,
        title,
        venueCapacity,
        expectedAttendance,
        ticketPrice,
        artistFee,
        gearCost,
        marketingBudget,
        barSplitPercent,
        totalBarSales,
        ...results,
      },
    });

    res.status(201).json(sim);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create simulation' });
  }
};

export const listSimulations = async (req: Request, res: Response) => {
  try {
    const userId = (req as Request & { user: { id: number } }).user.id;

    const sims = await prisma.simulation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(sims);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch simulations' });
  }
};
