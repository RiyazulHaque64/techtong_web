export const formatPrice = (price: number, fractionDigit = 0) =>
  new Intl.NumberFormat('bn-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: fractionDigit,
  }).format(price);
