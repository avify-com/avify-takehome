import React from 'react';
import './EnergyGrid.css';

interface FuelData {
  fuel: string;
  perc: number;
}

interface EnergyGridProps {
  data: FuelData[];
}

const EnergyGrid: React.FC<EnergyGridProps> = ({ data }) => {
  return (
    <div className="energy-grid">
      {data.map((item) => (
        <div className="energy-card" key={item.fuel}>
          <h2>{item.fuel.charAt(0).toUpperCase() + item.fuel.slice(1)}</h2>
          <p>{item.perc.toFixed(1)}%</p>
        </div>
      ))}
    </div>
  );
};

export default EnergyGrid;
