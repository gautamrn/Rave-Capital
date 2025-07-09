export function calculateROI(
    ticketPrice: number, 
    attendance: number,
    artistFee: number,
    gearCost: number,
    marketingBudget: number,
    barSplitPercent: number,
    totalBarSales: number
){
    const grossRevenue = ticketPrice * attendance;
    const totalCost = artistFee + gearCost + marketingBudget;
    const barRevenue = totalBarSales * (barSplitPercent / 100);
    const netProfit = grossRevenue + barRevenue - totalCost;
    const breakEven = Math.ceil(totalCost / ticketPrice);
    return {grossRevenue, totalCost, barRevenue, netProfit, breakEven};
}