import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';

beforeEach(() => {
    globalThis.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
            data: {
                from: '2025-04-05T18:00Z',
                to: '2025-04-05T18:30Z',
                generationmix: [
                    { fuel: 'biomass', perc: 5 },
                    { fuel: 'coal', perc: 0 },
                    { fuel: 'wind', perc: 35 },
                ],
            },
        }),
    });
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('App', () => {
    it('calls the API and displays generation mix data', async () => {
        render(<App />);

        await waitFor(() => {
            expect(globalThis.fetch).toHaveBeenCalledTimes(1);
        });

        const fuelItems = await screen.findAllByText((_, element) =>
            element?.textContent?.includes('%')
        );
        expect(fuelItems.length).toBeGreaterThan(0);
    });

    it('handles API error gracefully', async () => {
        globalThis.fetch = jest.fn().mockRejectedValue(new Error('API error'));

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument();
        });
    });
});
