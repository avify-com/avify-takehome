import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import './EnergyChart.css';

interface FuelData {
  fuel: string;
  perc: number;
}

interface EnergyChartProps {
  data: FuelData[];
}

const COLORS = [
  '#facc15', '#e11d48', '#38bdf8', '#06b6d4',
  '#10b981', '#f97316', '#64748b', '#8b5cf6', '#6b7280'
];

const EnergyChart: React.FC<EnergyChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="perc"
            nameKey="fuel"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnergyChart;
