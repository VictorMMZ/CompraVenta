const API_URL = 'http://127.0.0.1:8000/api/products';


export const getProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener productos');
    return await response.json();
  } catch (error) {
    console.error('Error en GET:', error);
    throw error;
  }
};


export const createProduct = async (product) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Error al crear producto');
    return await response.json();
  } catch (error) {
    console.error('Error en POST:', error);
    throw error;
  }
};


export const updateProduct = async (id, product) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Error al actualizar producto');
    return await response.json();
  } catch (error) {
    console.error('Error en UPDATE:', error);
    throw error;
  }
};


export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar producto');
    return await response.json();
  } catch (error) {
    console.error('Error en DELETE:', error);
    throw error;
  }
};
