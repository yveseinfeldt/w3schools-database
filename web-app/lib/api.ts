// lib/api.ts
export async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const apiBase = process.env.API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiBase}${endpoint}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export async function postToApi<T>(endpoint: string, data: any): Promise<T> {
  const apiBase = process.env.API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiBase}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

// Example specific function for products
export async function getProducts() {
  return fetchFromApi<{ ProductID: number; ProductName: string; Price: number, CategoryID: number }[]>('/products');
}

// Example specific function for categories
export async function getCategories() {
  return fetchFromApi<{ CategoryID: number; CategoryName: string; Description: string }[]>('/categories');
}

export async function createCategory(category: { CategoryName: string; Description: string }) {
  return postToApi<{ CategoryID: number; CategoryName: string; Description: string }>('/categories', category);
}