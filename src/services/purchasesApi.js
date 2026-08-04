const API_URL = 'http://127.0.0.1:8000/api/purchases/';


export const getPurchases = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener compras');
    return await response.json();
  } catch (error) {
    console.error('Error en GET:', error);
    throw error;
  }
};

export const getPurchaseById = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/`);
    if (!response.ok) throw new Error('Error al obtener la compra');
    return await response.json();
  } catch (error) {
    console.error('Error en GET por ID:', error);
    throw error;
  }
};

export const createPurchase = async (purchaseData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseData),
    });
    if (!response.ok) throw new Error('Error al crear la compra');
    return await response.json();
  } catch (error) {
    console.error('Error en POST:', error);
    throw error;
  }
};

export const updatePurchase = async (id, purchaseData) => {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseData),
    });
    if (!response.ok) throw new Error('Error al actualizar la compra');
    return await response.json();
  } catch (error) {
    console.error('Error en PUT:', error);
    throw error;
  }
};

export const deletePurchase = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar la compra');
    return await response.json();
  } catch (error) {
    console.error('Error en DELETE:', error);
    throw error;
  }
};