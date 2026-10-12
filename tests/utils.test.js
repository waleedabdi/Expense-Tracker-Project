
import { convertCurrency, calculateTotal } from '../src/utils.js';
const mockRates = {
    USD: 1.0,
    EUR: 0.90,
    KES: 130.0
};
describe( 'Core Math Calculation operation',() => {
    test('convertCurrency accurately processes base standard rates',() => {
        const result = convertCurrency(100, 'USD', 'EUR', mockRates);
        expect(result).toBeCloseTo(90.0);
    });

test('convertCurrency processes reverse rate evaluations correctly' () => {
    const result = convertCurrency(130, 'KES','USD', mockRates);
    expect(result).toBeCloseTo(1.0);
});

test('calculateTotal aggregates correct converted baseline amount', () => {
    const sampleExpenses = [
        { amount: '50', currency: 'USD'},
        { amount: '45', currency: 'EUR'}
    ];
    const combinedTotal = calculateTotal(sampleExpenses, 'USD', mockRates);
    expect(combinedTotal).toBeCloseTo(100.0);
});
 
});

