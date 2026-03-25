import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { MetalPrice } from "../data/mockData";

interface MetalPriceCardProps {
  metal: MetalPrice;
}

const metalIcons: Record<string, string> = {
  Gold: "🥇",
  Silver: "🥈",
  Platinum: "⚪",
  Palladium: "⚙️",
};

export function MetalPriceCard({ metal }: MetalPriceCardProps) {
  const isPositive = metal.change >= 0;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Card Header with gradient */}
      <div className={`h-1 ${isPositive ? 'bg-green-500' : 'bg-red-500'}`} />
      
      <div className="p-6">
        {/* Metal Name and Symbol */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{metalIcons[metal.name]}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{metal.name}</h3>
              <span className="text-xs text-gray-500">{metal.symbol}</span>
            </div>
          </div>
        </div>

        {/* Current Price */}
        <div className="mb-4">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            ${metal.price.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">{metal.unit}</div>
        </div>

        {/* Change Indicator */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="font-semibold">
              {isPositive ? '+' : ''}{metal.change.toFixed(2)}
            </span>
            <span className="text-sm">
              ({isPositive ? '+' : ''}{metal.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-1 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
          <Clock className="w-3 h-3" />
          <span>Updated {metal.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}
