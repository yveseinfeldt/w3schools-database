import { getCategoryById, getProductsByCategoryId } from '@/lib/api';
import { Product, Category } from '@/lib/types';

// Force this page to be rendered at runtime
export const dynamic = 'force-dynamic';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let category = {} as Category
  let products = [] as Product[]
  try {
    const categoryId = parseInt(slug, 10)
    category = await getCategoryById(categoryId)
    products = await getProductsByCategoryId(categoryId)
  } catch (err) {
    console.error('Failed to fetch products for category:', err)
  }
 
  return (
    <div>
      <a href="/categories" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Categories
      </a>
      <h1 className="text-2xl font-bold mb-4">Products in Category {category.CategoryName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.ProductID} className="border rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold">{product.ProductName}</h3>
            <p className="text-gray-500">Price: CHF{product.Price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}