const BASE = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1";

export type Meal = {
  id: string;
  meal: string;
  instructions: string;
  img: string;
  price: number | string;
  category: string;
};

export async function fetchMeals(): Promise<Meal[]> {
  const response = await fetch(`${BASE}/meals`, { method: "GET" });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to load menu items");
  }

  const data = (await response.json()) as Meal[];
  return Array.isArray(data) ? data : [];
}
