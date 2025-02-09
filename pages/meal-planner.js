import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import MealItem from "../components/MealItem";

const initialMeals = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

export default function MealPlanner() {
  const [meals, setMeals] = useState(initialMeals);
  const [dietaryPreference, setDietaryPreference] = useState("Vegan");
  const [aiMealPlan, setAiMealPlan] = useState(null);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const newMeals = { ...meals };
    
    // Ensure both active and over have the same parent before moving
    if (active.parentId === over.parentId) {
      const activeIndex = meals[active.parentId].findIndex(item => item.id === active.id);
      const overIndex = meals[over.parentId].findIndex(item => item.id === over.id);

      newMeals[active.parentId] = arrayMove(meals[active.parentId], activeIndex, overIndex);
    } else {
      // Moving between days
      const activeIndex = meals[active.parentId].findIndex(item => item.id === active.id);
      const overIndex = over.data.current.sortable.index;

      const itemToMove = newMeals[active.parentId][activeIndex];
      newMeals[active.parentId].splice(activeIndex, 1);
      newMeals[over.parentId].splice(overIndex, 0, itemToMove);
    }

    setMeals(newMeals);
  };

  const generateMealPlan = async () => {
    const res = await fetch("/api/meal-planner/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dietaryPreference }),
    });

    const data = await res.json();
    setAiMealPlan(data.plan);
  };

  useEffect(() => {
    if (aiMealPlan) {
      alert("AI Meal Plan: " + aiMealPlan);
      setAiMealPlan(null); // Reset after displaying
    }
  }, [aiMealPlan]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Meal Planner</h1>

      <div className="mb-4">
        <label className="block font-semibold">Dietary Preference:</label>
        <select
          value={dietaryPreference}
          onChange={(e) => setDietaryPreference(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="Vegan">Vegan</option>
          <option value="Keto">Keto</option>
          <option value="Gluten-Free">Gluten-Free</option>
        </select>
      </div>

      <button
        onClick={generateMealPlan}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Generate AI Meal Plan
      </button>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {Object.keys(meals).map((day) => (
          <div key={day} className="border p-4 rounded-lg mb-4">
            <h2 className="text-xl font-semibold">{day}</h2>
            <SortableContext id={day} items={meals[day].map(meal => meal.id)} strategy={verticalListSortingStrategy}>
              {meals[day].map((meal, index) => (
                <MealItem key={meal.id} id={meal.id} title={meal.title} />
              ))}
            </SortableContext>
          </div>
        ))}
      </DndContext>
    </div>
  );
}
