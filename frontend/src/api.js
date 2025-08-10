const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export async function fetchOrders(filters = {}) {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${API_BASE}/orders?${params.toString()}`);
  return res.json();
}

export async function createOrder(data) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateOrder(id, data) {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteOrder(id) {
  const res = await fetch(`${API_BASE}/orders/${id}`, { method: "DELETE" });
  return res.json();
}

export async function getOrder(id) {
  const res = await fetch(`${API_BASE}/orders/${id}`);
  return res.json();
}
