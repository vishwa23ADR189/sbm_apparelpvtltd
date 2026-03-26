const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Helper function for API requests
async function apiRequest(endpoint, method = 'GET', data = null) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Add authorization header if needed
      ...(localStorage.getItem('token') && {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Product Operations
async function addProduct(productData) {
  return apiRequest('/admin/products', 'POST', productData);
}

async function updateProduct(id, productData) {
  return apiRequest(`/admin/products/${id}`, 'PUT', productData);
}

async function deleteProduct(id) {
  return apiRequest(`/admin/products/${id}`, 'DELETE');
}

async function fetchProducts(page = 1, limit = 10) {
  return apiRequest(`/products?page=${page}&limit=${limit}`);
}

async function fetchProductById(id) {
  return apiRequest(`/products/${id}`);
}

// Category Operations
async function fetchCategories() {
  return apiRequest('/categories');
}

// User/Auth Operations
async function login(email, password) {
  return apiRequest('/auth/login', 'POST', { email, password });
}

async function getCurrentUser() {
  return apiRequest('/auth/me');
}

const apiService = {
  // Products
  addProduct,
  updateProduct,
  deleteProduct,
  fetchProducts,
  fetchProductById,
  
  // Categories
  fetchCategories,
  
  // Auth
  login,
  getCurrentUser,
};

export default apiService;