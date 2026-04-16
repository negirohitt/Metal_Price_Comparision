import { useEffect, useState } from "react";
import { getAllPrices } from "../api/metalApi";

interface Metal {
    name: string;
    city: string;
    price: number;
    unit: string;
    lastUpdated: string;
}

export default function Dashboard() {
    const [metals, setMetals] = useState<Metal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllPrices()
            .then((data: Metal[]) => setMetals(data))
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 text-lg">Loading live prices...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600 font-medium">Cannot connect to backend</p>
                    <p className="text-red-400 text-sm mt-1">{error}</p>
                    <p className="text-gray-500 text-sm mt-2">
                        Make sure Spring Boot is running on port 8080
                    </p>
                </div>
            </div>
        );
    }

    const grouped: Record<string, Metal[]> = metals.reduce(
        (acc: Record<string, Metal[]>, metal: Metal) => {
            if (!acc[metal.name]) acc[metal.name] = [];
            acc[metal.name].push(metal);
            return acc;
        },
        {}
    );

    const metalColors: Record<string, string> = {
        Gold: "text-yellow-600",
        Silver: "text-gray-500",
        Platinum: "text-blue-600",
        Palladium: "text-purple-600",
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Metal Price Dashboard</h1>
                <p className="text-gray-500 mt-1">
                    Live prices from backend · {metals.length} entries loaded
                </p>
            </div>

            {Object.entries(grouped).map(([metalName, entries]: [string, Metal[]]) => (
                <div key={metalName} className="mb-8">
                    <h2
                        className={`text-xl font-semibold mb-3 ${
                            metalColors[metalName] ?? "text-green-600"
                        }`}
                    >
                        {metalName}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {entries.map((metal: Metal, i: number) => (
                            <div
                                key={i}
                                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
                            >
                                <p className="text-gray-500 text-sm font-medium">
                                    {metal.city}
                                </p>
                                <p
                                    className={`text-2xl font-bold mt-1 ${
                                        metalColors[metalName] ?? "text-green-600"
                                    }`}
                                >
                                    ₹{metal.price.toLocaleString("en-IN")}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">{metal.unit}</p>
                                <p className="text-xs text-gray-400">{metal.lastUpdated}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}