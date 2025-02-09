import { useState } from "react";

export default function UploadRecipe() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, ingredients, steps };

    const res = await fetch("/api/recipes/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) alert("Recipe uploaded!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input type="text" placeholder="Recipe Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
      <textarea placeholder="Steps" value={steps} onChange={(e) => setSteps(e.target.value)} required />
      <button type="submit">Upload Recipe</button>
    </form>
  );
}
