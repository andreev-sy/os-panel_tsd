export function isFloat(number) {
    return (parseFloat(number) % 1 === 0) ? false : true;
}

export function fixFloat(number, count = 3) {
    return isFloat(number) ? parseFloat(number).toFixed(count) : number;
}
