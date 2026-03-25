export interface MetalPrice {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
  unit: string;
}

export interface CityPrice {
  city: string;
  gold: number;
  silver: number;
  platinum: number;
}

export interface HistoricalDataPoint {
  date: string;
  price: number;
}

export const metalPrices: MetalPrice[] = [
  {
    name: "Gold",
    symbol: "Au",
    price: 6245.50,
    change: 45.20,
    changePercent: 0.73,
    lastUpdated: "2 mins ago",
    unit: "USD/oz"
  },
  {
    name: "Silver",
    symbol: "Ag",
    price: 74.85,
    change: -1.35,
    changePercent: -1.77,
    lastUpdated: "2 mins ago",
    unit: "USD/oz"
  },
  {
    name: "Platinum",
    symbol: "Pt",
    price: 1042.30,
    change: 12.80,
    changePercent: 1.24,
    lastUpdated: "5 mins ago",
    unit: "USD/oz"
  },
  {
    name: "Palladium",
    symbol: "Pd",
    price: 987.60,
    change: -8.40,
    changePercent: -0.84,
    lastUpdated: "3 mins ago",
    unit: "USD/oz"
  }
];

export const cityPrices: CityPrice[] = [
  { city: "Mumbai", gold: 65420, silver: 78540, platinum: 31200 },
  { city: "Delhi", gold: 65380, silver: 78510, platinum: 31180 },
  { city: "Bangalore", gold: 65450, silver: 78580, platinum: 31220 },
  { city: "Chennai", gold: 65410, silver: 78520, platinum: 31195 },
  { city: "Kolkata", gold: 65395, silver: 78495, platinum: 31175 },
  { city: "Hyderabad", gold: 65430, silver: 78560, platinum: 31210 },
];

export const generateHistoricalData = (
  basePrice: number,
  days: number
): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate realistic price fluctuation
    const variance = (Math.random() - 0.5) * (basePrice * 0.05);
    const price = parseFloat((basePrice + variance).toFixed(2));
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: price
    });
  }
  
  return data;
};

export const marketSources = [
  { name: "International Market", premium: 0 },
  { name: "London Metal Exchange", premium: 0.5 },
  { name: "COMEX", premium: 0.3 },
  { name: "Indian Market", premium: 2.5 },
  { name: "Dubai Market", premium: 1.2 },
];
