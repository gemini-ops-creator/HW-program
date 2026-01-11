const BASE_URL = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type OrderAddress = {
  street: string;
  house: string;
};

type CreateOrderArgs = {
  items: OrderItem[];
  address: OrderAddress;
  userId?: string | null;
};

type OrderResponse = {
  id?: string;
  orderId?: string;
} & Record<string, unknown>;

export async function createOrder({
  items,
  address,
  userId,
}: CreateOrderArgs): Promise<OrderResponse> {
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

  return (await response.json()) as OrderResponse;
}
