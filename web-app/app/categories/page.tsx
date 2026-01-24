import { getCategories } from '@/lib/api';

// Force this page to be rendered at runtime
export const dynamic = 'force-dynamic';

export default async function Page() {
  let categories = [] as { CategoryID: number; CategoryName: string; Description: string }[];
  try {
    categories = await getCategories();
  } catch (err) {
    console.error('Failed to fetch categories:', err);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div key={category.CategoryID} className="border rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold">{category.CategoryName}</h2>
          <p className="text-gray-500">{category.Description}</p>
        </div>
      ))}
    </div>
  );
}