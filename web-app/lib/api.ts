// lib/api.ts
import {Product, Category} from './types';

export async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const apiBase = process.env.API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiBase}${endpoint}`, 
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
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
  return fetchFromApi<Product[]>('/products');
}

export async function getProductsByCategoryId(categoryId: number) {
  let products = await fetchFromApi<Product[]>('/products');
  return products.filter(product => product.CategoryID === categoryId);
}

// Example specific function for categories
export async function getCategories() {
  return fetchFromApi<Category[]>('/categories');
}

export async function getCategoryById(categoryId: number) {
  let categoryResul = await fetchFromApi<Category[]>(`/categories/${categoryId}`);
  return categoryResul[0];
}

export async function createCategory(category: { CategoryName: string; Description: string }) {
  return postToApi<Category>('/categories', category);
}