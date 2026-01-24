import { getProducts, getCategories } from '@/lib/api';

// Force this page to be rendered at runtime
export const dynamic = 'force-dynamic';

export default async function Page() {
  let products = [] as { ProductID: number; ProductName: string; Price: number, CategoryID: number }[];
  try {
    products = await getProducts();
  } catch (err) {
    console.error('Failed to fetch products:', err);
  }

  let categories = [] as { CategoryID: number; CategoryName: string; }[];
  try {
    categories = await getCategories();
  }
  catch (err) {
    console.error('Failed to fetch categories:', err);
  }

  return (
    <div>
      {categories.map((category) => (
        <div key={category.CategoryID} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category.CategoryName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products
              .filter((product) => product.CategoryID === category.CategoryID)
              .map((product) => (
                <div key={product.ProductID} className="border rounded-lg p-4 shadow-md">
                  <h3 className="text-lg font-semibold">{product.ProductName}</h3>
                  <p className="text-gray-500">Price: CHF{product.Price.toFixed(2)}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
