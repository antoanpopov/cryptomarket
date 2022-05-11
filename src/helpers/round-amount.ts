export const roundAmount = (amount: string | number, precision = 6) => {
    return Number.parseFloat(amount.toString()).toFixed(precision);
}