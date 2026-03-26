// Import the original data
import { featuredCategories, featuredProducts, allProducts } from './data.js';

// Create a copy of the original data to work with
let categories = [...featuredCategories];
let products = [...allProducts];

// Helper function to generate a new product ID
const generateProductId = () => {
  const maxId = products.reduce((max, product) => Math.max(max, product.id), 0);
  return maxId + 1;
};

// Categories CRUD Operations
export const categoryService = {
  // Get all categories
  getAll: () => categories,
  
  // Get a single category by slug
  getBySlug: (slug) => categories.find(category => category.slug === slug),
  
  // Create a new category
  create: (newCategory) => {
    // Check if slug already exists
    if (categories.some(cat => cat.slug === newCategory.slug)) {
      throw new Error('Category with this slug already exists');
    }
    
    categories.push(newCategory);
    return newCategory;
  },
  
  // Update a category
  update: (slug, updatedCategory) => {
    const index = categories.findIndex(cat => cat.slug === slug);
    if (index === -1) {
      throw new Error('Category not found');
    }
    
    // Preserve the original slug (use it as identifier)
    updatedCategory.slug = slug;
    categories[index] = updatedCategory;
    return updatedCategory;
  },
  
  // Delete a category
  delete: (slug) => {
    const index = categories.findIndex(cat => cat.slug === slug);
    if (index === -1) {
      throw new Error('Category not found');
    }
    
    // Check if any products are using this category
    const productsInCategory = products.filter(p => p.category === slug);
    if (productsInCategory.length > 0) {
      throw new Error('Cannot delete category with associated products');
    }
    
    const deletedCategory = categories[index];
    categories = categories.filter(cat => cat.slug !== slug);
    return deletedCategory;
  }
};

// Products CRUD Operations
export const productService = {
  // Get all products
  getAll: () => products,
  
  // Get featured products
  getFeatured: () => products.filter(product => 
    featuredProducts.some(fp => fp.id === product.id)
  ),
  
  // Get products by category
  getByCategory: (categorySlug) => 
    products.filter(product => product.category === categorySlug),
  
  // Get a single product by ID
  getById: (id) => products.find(product => product.id === id),
  
  // Create a new product
  create: (newProduct) => {
    // Check if category exists
    if (!categories.some(cat => cat.slug === newProduct.category)) {
      throw new Error('Category does not exist');
    }
    
    const productWithId = {
      ...newProduct,
      id: generateProductId()
    };
    
    products.push(productWithId);
    return productWithId;
  },
  
  // Update a product
  update: (id, updatedProduct) => {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    
    // Check if category exists
    if (!categories.some(cat => cat.slug === updatedProduct.category)) {
      throw new Error('Category does not exist');
    }
    
    // Preserve the original ID
    updatedProduct.id = id;
    products[index] = updatedProduct;
    return updatedProduct;
  },
  
  // Delete a product
  delete: (id) => {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    
    const deletedProduct = products[index];
    products = products.filter(product => product.id !== id);
    return deletedProduct;
  }
};

// Reset data to original state (for testing/development)
export const resetData = () => {
  categories = [...featuredCategories];
  products = [...allProducts];
};