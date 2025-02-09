import { useShoppingListStore } from "../store/shoppingListStore";
import { TrashIcon } from "@heroicons/react/solid";

export default function ShoppingList() {
  const { items, removeItem, clearList } = useShoppingListStore();

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
        <button onClick={clearList} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
          Clear List
        </button>
      )}
    </div>
  );
}
