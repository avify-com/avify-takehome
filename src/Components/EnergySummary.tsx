import React from 'react';

interface FuelData {
  fuel: string;
  perc: number;
}

interface EnergySummaryProps {
  data: FuelData[];
  from: string;
  to: string;
}

const EnergySummary: React.FC<EnergySummaryProps> = ({ data, from, to }) => {
  const mostUsed = [...data].sort((a, b) => b.perc - a.perc)[0];

  const formatDateTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="energy-summary">
      <p>
        Data From <strong>{formatDateTime(from)}</strong> To{' '}
        <strong>{formatDateTime(to)}</strong>
      </p>
      <p>
      The energy source with the highest generation is <strong>{mostUsed.fuel}</strong> with <strong>{mostUsed.perc.toFixed(1)}%</strong> of the total.
     </p>
    </div>
  );
};

export default EnergySummary;
