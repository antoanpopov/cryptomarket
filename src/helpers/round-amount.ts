export const roundAmount = (amount: string | number, precision = 6) => {
    return Number.parseFloat(Number.parseFloat(amount.toString()).toFixed(precision));
}