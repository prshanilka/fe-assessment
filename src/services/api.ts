import { IProduct } from "@/interfaces/product.interface";

/**
 * Fetches all available categories of products from the API.
 * @returns {Promise<string[]>} A promise that resolves to an array of strings representing categories.
 * @throws {Error} If the fetch operation fails.
 */
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/products/categories`);
    return response.json();
  } catch (error) {
    throw new Error("Fetch Failed");
  }
};

/**
 * Fetches all products from the API.
 * @returns {Promise<{ products: IProduct[] }>} A promise that resolves to an object containing an array of products.
 * @throws {Error} If the fetch operation fails.
 */
export const fetchAllProducts = async (): Promise<{ products: IProduct[] }> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/products`);
    return response.json();
  } catch (error) {
    throw new Error("Fetch Failed");
  }
};

/**
 * Fetches products belonging to a specific category from the API..
 * @param {string} category - The category of products to fetch.
 * @returns {Promise<{ products: IProduct[] }>} A promise that resolves to an object containing an array of products.
 * @throws {Error} If the fetch operation fails.
 */
export const fetchProductsByCategory = async ({
  category,
}: {
  category: string;
}): Promise<{ products: IProduct[] }> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/products/category/${category}`
    );
    return response.json();
  } catch (error) {
    throw new Error("Fetch Failed");
  }
};
