import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

axios.defaults.baseURL = API_BASE;

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if(token) config.headers!['Authorization'] = `Bearer ${token}`;
    return config;
});

export interface SimulationInput{
    title: string;
    venueCapacity: number;
    expectedAttendance: number;
    ticketPrice: number;
    artistFee: number;
    gearCost: number;
    marketingBudget: number;
    barSplitPercent: number;
    totalBarSales: number;
}

export interface SimulationResult extends SimulationInput{
    id: number;
    grossRevenue: number;
    barRevenue: number;
    totalCost: number;
    netProfit: number;
    breakEven: number;
    createdAt: string;
}

export function createSimulation(data: SimulationInput){
    return axios.post<SimulationResult>('/simulations', data).then(r => r.data);
}

export function listSimulations(){
    return axios.get<SimulationResult[]>('/simulations').then(r => r.data);
}

export async function delteSimulation(id: number){
    return axios.delete(`/simulations/${id}`).then(() => {});
}