const BASE_URL = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1";

export async function createOrder({ items, address, userId }) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items,
      address,
      userId: userId ?? null,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to create order");
  }

  return response.json();
}
