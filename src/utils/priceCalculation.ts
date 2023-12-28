export const priceCalculation = (basePrice: number, activeMemory: number): number => {
  return Math.round(basePrice * (1 + activeMemory / 10));
};
