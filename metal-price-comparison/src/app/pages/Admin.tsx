import { useState } from "react";
import { updatePrice } from "../api/metalApi";

const METALS = ["Gold", "Silver", "Platinum", "Palladium"];
const CITIES = ["Delhi", "Mumbai", "Chennai", "Kolkata"];

export default function Admin() {
  const [metal, setMetal] = useState("Gold");
  const [city, setCity] = useState("Delhi");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!price || isNaN(Number(price))) {
      setError("Please enter a valid price");
      return;
    }
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await updatePrice(metal, city, Number(price));
      setMessage(`✅ ${metal} price in ${city} updated to ₹${price}`);
      setPrice("");
    } catch (err: any) {
      setError("❌ Update failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Metal</label>
            <select value={metal} onChange={e => setMetal(e.target.value)}
                    className="w-full border rounded-lg p-2">
              {METALS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <select value={city} onChange={e => setCity(e.target.value)}
                    className="w-full border rounded-lg p-2">
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">New Price (₹)</label>
            <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="e.g. 73500"
                className="w-full border rounded-lg p-2"
            />
          </div>

          <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg
                     hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Updating..." : "Update Price"}
          </button>

          {message && <p className="text-green-600 font-medium">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
  );
}