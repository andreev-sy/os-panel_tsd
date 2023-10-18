export function isFloat(num) {
    return (num % 1 === 0) ? false : true;
}

export function fixFloat(num, count = 3) {
    return isFloat(num) ? parseFloat(num.toFixed(count)) : num;
}