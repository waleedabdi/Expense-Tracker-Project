export function convertCurrency(amount, fromCurrency, toCurrency, rates) {
    if (!rates || !rates[fromCurrency] || !rates[toCurrency]) return amount;
    const inUSD = amount / rates[fromCurrency];
    return inUSD * rates[toCurrency];
}

export function calculateTotal(expenses, homeCurrency, rates) {
    return expenses.reduce((Sum, exp) => {
        const converted = convertCurrency(Number(exp.amount), exp.currency, homeCurrency, rates);
        return sum + converted;
    }, 0);
}
