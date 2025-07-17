import React, { useState } from 'react';

export default function InputForm() {
  const [venueName, setVenueName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [rent, setRent] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [result, setResult] = useState<string | null>(null);


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      venueName, 
      capacity: Number(capacity),
      rent: Number(rent),
      ticketPrice: Number(ticketPrice),
    };

    try{
      const res = await fetch("http://localhost:3000/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if(!res.ok) throw new Error("Failed to calculate");

      const data = await res.json();
      setResult(`Profit for ${data.venueName}: $${data.profit}`);
    } catch(err){
      setResult("Error calculating profit");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {result && <p style={{ marginTop: "1rem" }}>{result}</p>}

      <h2>Venue ROI Simulator</h2>

      <label>
        Venue Name:
        <input
          type="text"
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
        />
      </label>

      <label>
        Capacity:
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </label>

      <label>
        Rent ($):
        <input
          type="number"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
        />
      </label>

      <label>
        Ticket Price ($):
        <input
          type="number"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(e.target.value)}
        />
      </label>

      <button type="submit">Calculate Profit</button>
    </form>
  );
}