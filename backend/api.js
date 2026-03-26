const API_URL = "http://localhost:5000"; // or use env

async function addProduct(data) {
  const formData = new FormData();
  
  // Append text fields
  for (const key in data) {
    if (key !== "images") {
      formData.append(key, data[key]);
    }
  }

  // Append multiple images
  if (data.images && data.images.length > 0) {
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }
  }

  const res = await fetch(`${API_URL}/admin/products`, {
    method: "POST",
    body: formData, // No need for headers, browser sets it automatically
  });
  return res.json();
}

async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
}

export default { addProduct, deleteProduct, fetchProducts };
