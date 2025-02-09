import { useShoppingListStore } from "../store/shoppingListStore";
import { TrashIcon } from "@heroicons/react/solid";
import { useState } from "react";

export default function ShoppingList() {
  const { items, removeItem, clearList } = useShoppingListStore();
  const [optimizedList, setOptimizedList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [priceData, setPriceData] = useState([]);

  const optimizeList = async () => {
    const res = await fetch("/api/shopping-list/optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();
    setOptimizedList(data.optimizedList);
  };

  const orderGroceries = async (service) => {
    if (items.length === 0) {
      alert("Your shopping list is empty!");
      return;
    }

    setLoading(true);
    
    const res = await fetch("/api/shopping-list/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, service }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.orderUrl) {
      window.location.href = data.orderUrl;
    } else {
      alert("Failed to place order. Try again later.");
    }
  };

  const comparePrices = async () => {
    if (items.length === 0) {
      alert("Your shopping list is empty!");
      return;
    }

    setLoading(true);
    
    const res = await fetch("/api/shopping-list/compare-prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.prices) {
      setPriceData(data.prices);
    } else {
      alert("Failed to fetch prices. Try again later.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Grocery Shopping List</h1>

      {items.length === 0 ? (
        <p>Your shopping list is empty.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between p-2 bg-gray-100 rounded">
              {item.name}: {item.quantity}
              <button onClick={() => removeItem(item.name)} className="text-red-500">
                <TrashIcon className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <>
          <button onClick={() => orderGroceries("instacart")} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
            Order with Instacart
          </button>
          <button onClick={() => orderGroceries("amazon")} className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded">
            Order with Amazon Fresh
          </button>
          <button onClick={clearList} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
            Clear List
          </button>
          <button onClick={comparePrices} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Compare Prices
          </button>
          <button onClick={optimizeList} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Optimize List with AI
          </button>
        </>
      )}

      {optimizedList && <p className="mt-4">Optimized List: {optimizedList}</p>}

      {priceData.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">🛍 Price Comparison</h2>
          <ul className="mt-2 space-y-2">
            {priceData.map((item, index) => (
              <li key={index} className="p-2 bg-gray-200 rounded">
                <strong>{item.name}</strong><br />
                🏪 Walmart: ${item.walmart} | 🛒 Amazon: ${item.amazon} | 🚛 Instacart: ${item.instacart}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
