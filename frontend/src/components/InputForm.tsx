import React, {useState} from 'React';
import {createSimulation, SimulationInput, SimulationResult} from '../api/simulations';

type Props = {
    onCreated: (sim:SimulationResult) => void;
}

export function InputForm({onCreated}: Props){
    
    //inputs
    const [form, setForm] = useState<SimulationInput>({
        title: '',
        venueCapacity: 0,
        expectedAttendance: 0,
        ticketPrice: 0,
        artistFee: 0,
        gearCost: 0,
        marketingBudget: 0,
        barSplitPercent: 0,
        totalBarSales: 0,
    });

    const [loading, setLoading] = useState(false);
    const[error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const{name, value} = e.target;
        setForm(f => ({...f, [name]: Number(value) || 0}));
    };

    //submission via api handler
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            const result = await createSimulation(form);
            onCreated(result);
        } catch(err: any){
            setError(err.response?.data?.error || 'Submission failed');
        } finally{
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                name="title"
                type="text"
                placeholder="Simulation Title"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="block w-full p-2 border rounded"
                required
            />

            {(['venueCapacity','expectedAttendance','ticketPrice','artistFee','gearCost','marketingBudget','barSplitPercent','totalBarSales'] as const).map((field) => (
                <div key={field}>
                <label className="block text-sm">{field.replace(/([A-Z])/g, ' $1')}</label>
                <input
                    name={field}
                    type="number"
                    value={(form as any)[field]}
                    onChange={handleChange}
                    className="block w-full p-2 border rounded"
                    required
                />
                </div>
            ))}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                {loading ? 'Submitting...' : 'Run Simulation'}
            </button>
        </form>
  );
}