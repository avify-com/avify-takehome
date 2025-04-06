import React, { useEffect, useState } from 'react';
import './App.css';
import EnergyChart from './Components/EnergyChart';
import EnergySummary from './Components/EnergySummary';
import EnergyGrid from './Components/EnergyGrid';

interface FuelData {
    fuel: string;
    perc: number;
}

const App: React.FC = () => {
    const [energyMix, setEnergyMix] = useState<FuelData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dataTime, setDataTime] = useState<{ from: string; to: string } | null>(null);

    useEffect(() => {
        const fetchEnergyData = async () => {
            try {
                const response = await fetch('https://api.carbonintensity.org.uk/generation');
                const data = await response.json();
                setEnergyMix(data.data.generationmix);
                setDataTime({ from: data.data.from, to: data.data.to });
            } catch (err) {
                setError('Error fetching the data');
            } finally {
                setLoading(false);
            }
        };

        fetchEnergyData();
    }, []);

    return (
        <div className="App">
            <h1>UK Energy Mix</h1>

            {loading && <p>Loading data...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
                <>
                    {dataTime && (
                        <EnergySummary
                            data={energyMix}
                            from={dataTime.from}
                            to={dataTime.to}
                        />
                    )}
                    <EnergyChart data={energyMix} />
                    <EnergyGrid data={energyMix} />
                </>
            )}
        </div>
    );
};

export default App;
