const BASE = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1";

const ApiService = {
  async getMeals() {
    const res = await fetch(`${BASE}/meals`);
    if (!res.ok) throw new Error("Failed to fetch meals");
    return res.json();
  },

  async getOrders() {
    const res = await fetch(`${BASE}/orders`);
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  },

  async createOrder(order) {
    const res = await fetch(`${BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error("Failed to create order");
    return res.json();
  },
};

export default ApiService;
