import { create } from "zustand";

export const useShoppingListStore = create((set) => ({
  items: [],

  addRecipeToList: (recipe) =>
    set((state) => {
      const updatedItems = [...state.items];

      recipe.ingredients.forEach(({ name, quantity }) => {
        const existingItem = updatedItems.find((item) => item.name === name);
        if (existingItem) {
          existingItem.quantity += ` + ${quantity}`;
        } else {
          updatedItems.push({ name, quantity });
        }
      });

      return { items: updatedItems };
    }),

  removeItem: (name) =>
    set((state) => ({
      items: state.items.filter((item) => item.name !== name),
    })),

  clearList: () => set({ items: [] }),
}));
