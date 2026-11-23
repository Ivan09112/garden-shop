// Адрес бэкенда (telran-backend). Запускается командой `npm run dev` в папке бэкенда.
export const BASE_URL = 'http://localhost:3333';

export const getImageUrl = (path) => (path ? `${BASE_URL}${path}` : '');

export async function request(url, options = {}) {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }

  const data = await response.json();

  // Бэкенд возвращает ошибки со статусом 200 в виде { status: 'ERR', message }
  if (data && data.status === 'ERR') {
    throw new Error(data.message);
  }

  return data;
}

export const api = {
  getCategories: () => request('/categories/all'),
  getCategoryProducts: (id) => request(`/categories/${id}`),
  getProducts: () => request('/products/all'),
  getProduct: (id) => request(`/products/${id}`),
  sendSaleRequest: (body) =>
    request('/sale/send', { method: 'POST', body: JSON.stringify(body) }),
  sendOrder: (body) =>
    request('/order/send', { method: 'POST', body: JSON.stringify(body) }),
};
