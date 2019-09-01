const decimalFromColor = (hex) => {
    const number = '0x' + hex.substring(1);
    return parseInt(number, 16);
};

export const simpleContrast = (hexColor) => {
    return (decimalFromColor(hexColor) < 0xffffff / 2) ? '#FFFFFF' : '#000000';
}
