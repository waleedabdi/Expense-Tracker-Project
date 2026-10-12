export let state = {
    expenses: [],
    homeCurrency: 'USD',
    rates: {}
};
export function setRates(newRates) {
    state = { ...state, rates: newRates };
}
export function setHomeCurrency(currency) {
state = { ...state, homeCurrency: currency };
}
export function addExpense(expense) {
    const newExpense = {
        ...expense,
        id: Date.now().toString()
    };
    state = {
        ...state,
        expenses: [...state.expenses, newExpense]
    };
    export function deleteExpense(id) {
        state = {
            ...state,
            expenses: state.expenses.filter(exp => exp.id !== id)
        }
    };
}
