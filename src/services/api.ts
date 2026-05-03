import { auth } from './firebase';

const API_BASE = '/api';

async function getHeaders() {
  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(user?.email ? { 'x-user-email': user.email } : {})
  };
}

export const api = {
  // Menu
  getMenu: async () => {
    const res = await fetch(`${API_BASE}/menu`);
    return res.json();
  },
  
  addMenuItem: async (item: any) => {
    const headers = await getHeaders();
    const res = await fetch(`${API_BASE}/menu`, {
      method: 'POST',
      headers,
      body: JSON.stringify(item)
    });
    return res.json();
  },

  deleteMenuItem: async (id: string) => {
    const headers = await getHeaders();
    await fetch(`${API_BASE}/menu/${id}`, {
      method: 'DELETE',
      headers
    });
  },

  // Orders
  createOrder: async (orderData: any) => {
    const headers = await getHeaders();
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData)
    });
    return res.json();
  },

  getOrders: async () => {
    const headers = await getHeaders();
    const res = await fetch(`${API_BASE}/orders`, { headers });
    return res.json();
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const headers = await getHeaders();
    const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  // Reports
  getSalesReport: async () => {
    const headers = await getHeaders();
    const res = await fetch(`${API_BASE}/reports/sales`, { headers });
    return res.json();
  }
};
