export interface ROICalculation{
    grossRevenue: number;
    barRevenue: number;
    totalCost: number;
    breakEven: number;
    netProfit: number;
}

export function calculateROI(
    ticketPrice: number,
    attendance: number,
    artistFee: number,
    gearCost: number,
    marketingBudget: number,
    barSplitPercent: number,
    totalBarSales: number
): ROICalculation{
    const grossRevenue = attendance * ticketPrice;
    const barRevenue = totalBarSales * (barSplitPercent / 100);
    const totalCost = artistFee + gearCost + marketingBudget;
    const breakEven = Math.ceil(totalCost / ticketPrice);
    const netProfit = grossRevenue + barRevenue - totalCost;

    return{grossRevenue, barRevenue, totalCost, breakEven, netProfit};
}