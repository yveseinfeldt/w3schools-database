'use client'

import { createCategory } from '@/lib/api';

// Force this page to be rendered at runtime
export const dynamic = 'force-dynamic';

export default function Page() {
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const categoryName = formData.get('categoryName') as string;
        const description = formData.get('description') as string;

        try {
            await createCategory({ CategoryName: categoryName, Description: description });
            alert('Category created successfully!');
            window.location.href = '/categories'; // Redirect to categories list
        } catch (err) {
            console.error('Failed to create category:', err);
            alert('Failed to create category.');
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Create New Category</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                        Category Name
                    </label>
                    <input
                        type="text"
                        name="categoryName"
                        id="categoryName"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    ></textarea>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Create Category
                    </button>
                </div>
            </form>
        </div>
    );
}
