'use client';

import { useState, useEffect } from 'react';
import { getCategories, createCategory } from '@/lib/api';

type Category = { CategoryID: number; CategoryName: string; Description: string };

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err: any) {
      console.error('Error fetching categories:', err);
      setError('Failed to fetch categories: ' + (err.message || err.toString()));
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createCategory({ CategoryName: name, Description: desc });
      setName('');
      setDesc('');
      await fetchCategories();
    } catch (err) {
      setError('Failed to create category');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="border rounded px-2 py-1"
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          required
          className="border rounded px-2 py-1 ml-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-1 rounded ml-2"
        >
          {loading ? 'Adding...' : 'Add Category'}
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.CategoryID} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold">{category.CategoryName}</h2>
            <p className="text-gray-500">{category.Description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}