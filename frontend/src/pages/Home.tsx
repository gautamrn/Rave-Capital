// frontend/src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { InputForm } from '../components/InputForm';
import { listSimulations, SimulationResult, deleteSimulation } from '../api/simulations';

export default function Home() {
  const [sims, setSims] = useState<SimulationResult[]>([]);
  const [latest, setLatest] = useState<SimulationResult | null>(null);

  useEffect(() => {
    (async () => {
      const [data, err] = await listSimulations();
      if (data) {
        setSims(data);
        if (data.length) setLatest(data[0]);
      }
    })();
  }, []);

  const handleSelect = (sim: SimulationResult) => setLatest(sim);

  const handleDelete = async (id: number) => {
    await deleteSimulation(id);
    setSims(s => s.filter(x => x.id !== id));
    if (latest?.id === id) setLatest(null);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">RaveCapital Simulator</h1>
      <InputForm
        onCreated={sim => {
          setSims(s => [sim, ...s]);
          setLatest(sim);
        }}
      />

      {sims.length === 0 ? (
        <p className="mt-8 text-center text-gray-500">No simulations yet.</p>
      ) : (
        <ul className="mt-8 space-y-2">
          {sims.map(sim => (
            <li key={sim.id} className="flex justify-between items-center">
              <div>
                <button
                  className="font-medium text-blue-600 hover:underline"
                  onClick={() => handleSelect(sim)}
                >
                  {sim.title}
                </button>
                <span className="text-sm text-gray-500 ml-2">{new Date(sim.createdAt).toLocaleString()}</span>
              </div>
              <button
                onClick={() => handleDelete(sim.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {latest && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Results for "{latest.title}"</h2>
        </div>
      )}
    </div>
  );
}
