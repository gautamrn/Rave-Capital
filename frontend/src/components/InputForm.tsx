import React, { useState } from 'react';

export default function InputForm() {
  const [venueName, setVenueName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [rent, setRent] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const capacityNum = parseInt(capacity);
    const rentNum = parseFloat(rent);
    const priceNum = parseFloat(ticketPrice);
    const profit = capacityNum * priceNum - rentNum;
    alert(`Estimated Profit: $${profit}`);
  };

  return (
    <form onSubmit={handleSubmit}>
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