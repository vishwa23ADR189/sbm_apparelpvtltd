import { featuredCategories, featuredProducts, allProducts } from '../data/data';

let categories = [...featuredCategories];
let products = [...allProducts];

const generateProductId = () => {
  const maxId = products.reduce((max, product) => Math.max(max, product.id), 0);
  return maxId + 1;
};

export const categoryService = {
  getAll: () => [...categories],
  getBySlug: (slug) => categories.find(category => category.slug === slug),
  create: (newCategory) => {
    if (categories.some(cat => cat.slug === newCategory.slug)) {
      throw new Error('Category with this slug already exists');
    }
    categories.push(newCategory);
    return newCategory;
  },
  update: (slug, updatedCategory) => {
    const index = categories.findIndex(cat => cat.slug === slug);
    if (index === -1) throw new Error('Category not found');
    updatedCategory.slug = slug;
    categories[index] = updatedCategory;
    return updatedCategory;
  },
  delete: (slug) => {
    const index = categories.findIndex(cat => cat.slug === slug);
    if (index === -1) throw new Error('Category not found');
    if (products.some(p => p.category === slug)) {
      throw new Error('Cannot delete category with associated products');
    }
    const deletedCategory = categories[index];
    categories = categories.filter(cat => cat.slug !== slug);
    return deletedCategory;
  }
};

export const productService = {
  getAll: () => [...products],
  getFeatured: () => products.filter(product => 
    featuredProducts.some(fp => fp.id === product.id)
  ),
  getByCategory: (categorySlug) => 
    products.filter(product => product.category === categorySlug),
  getById: (id) => products.find(product => product.id === id),
  create: (newProduct) => {
    if (!categories.some(cat => cat.slug === newProduct.category)) {
      throw new Error('Category does not exist');
    }
    const productWithId = { ...newProduct, id: generateProductId() };
    products.push(productWithId);
    return productWithId;
  },
  update: (id, updatedProduct) => {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) throw new Error('Product not found');
    if (!categories.some(cat => cat.slug === updatedProduct.category)) {
      throw new Error('Category does not exist');
    }
    updatedProduct.id = id;
    products[index] = updatedProduct;
    return updatedProduct;
  },
  delete: (id) => {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) throw new Error('Product not found');
    const deletedProduct = products[index];
    products = products.filter(product => product.id !== id);
    return deletedProduct;
  }
};

export const resetData = () => {
  categories = [...featuredCategories];
  products = [...allProducts];
};