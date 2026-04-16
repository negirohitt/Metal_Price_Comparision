export const METALS: string[] = ["Gold", "Silver", "Platinum", "Palladium"];
export const CITIES: string[] = ["Delhi", "Mumbai", "Chennai", "Kolkata"];

export function generateHistoricalData(metalName: string) {
  const basePrice: Record<string, number> = {
    Gold: 72000,
    Silver: 850,
    Platinum: 30000,
    Palladium: 28000,
  };
  const base = basePrice[metalName] ?? 10000;

  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    price: Math.floor(base + Math.random() * base * 0.1 - base * 0.05),
  }));
}