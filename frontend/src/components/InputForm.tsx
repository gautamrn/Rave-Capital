import React, {useState} from 'React';
import {createSimulation, SimulationInput, SimulationResult} from '../api/simulations';


const fieldLabels: Record<string, string> = {
  venueCapacity: 'Venue Capacity',
  expectedAttendance: 'Attendance',
  ticketPrice: 'Ticket Price ($)',
  artistFee: 'Artist Fee ($)',
  gearCost: 'Gear Cost ($)',
  marketingBudget: 'Marketing Budget ($)',
  barSplitPercent: 'Bar Split (%)',
  totalBarSales: 'Total Bar Sales ($)',
};

type Props = {
    onCreated: (sim:SimulationResult) => void;
}

export function InputForm({onCreated}: Props){
    
    const initialState: SimulationInput = {
        title: '',
        venueCapacity: 1,
        expectedAttendance: 1,
        ticketPrice: 0,
        artistFee: 0,
        gearCost: 0,
        marketingBudget: 0,
        barSplitPercent: 0,
        totalBarSales: 0,
    };

    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const{name, value} = e.target;
        setForm(f => ({...f, [name]: Number(value) || 0}));
    };

    const resetForm = () => setForm(initialState);
    
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

      {Object.keys(fieldLabels).map(field => (
        <div key={field}>
          <label className="block text-sm">{fieldLabels[field]}</label>
          <input
            name={field}
            type="number"
            min={field === 'venueCapacity' || field === 'expectedAttendance' ? 1 : 0}
            max={field === 'barSplitPercent' ? 100 : undefined}
            value={(form as any)[field]}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
            required
          />
        </div>
      ))}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? 'Submitting...' : 'Run Simulation'}
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </form>
  );
}