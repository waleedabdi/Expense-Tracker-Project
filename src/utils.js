export function convertCurrency(amount, fromCurrency, toCurrency, rates) {
    if (!rates || !rates[fromCurrency] || !rates[toCurrency]) return amount;
    const inUSD = amount / rates[fromCurrency];
    return inUSD * rates[toCurrency];
}

export function calculateTotal(expenses = [], homeCurrency, rates) {
    if (!Array.isArray(expenses)) return 0;

    return expenses.reduce((sum, exp) => {
        if (!exp || exp.amount === undefined || exp.amount === null) {
            return sum;
        }

        const amount = Number(exp.amount);
        if (Number.isNaN(amount)) {
            return sum;
        }

        const converted = convertCurrency(amount, exp.currency, homeCurrency, rates);
        return sum + (Number.isFinite(converted) ? converted : 0);
    }, 0);
}
