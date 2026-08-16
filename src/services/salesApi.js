const API_URL = 'http://localhost:8000/api/sales';


export const getSales = async () => {
  try {
    const response = await fetch(API_URL, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Error al obtener ventas');
    return await response.json();
  } catch (error) {
    console.error('Error en GET:', error);
    throw error;
  }
};


export const getSaleById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Error al obtener la venta');
    return await response.json();
  } catch (error) {
    console.error('Error en GET por ID:', error);
    throw error;
  }
};

export const createSale = async (saleData) => {
  try {

  
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(saleData),
    });
    if (!response.ok) throw new Error('Error al crear la venta');
    return await response.json();
  } catch (error) {
    console.error('Error en POST:', error);
    throw error;
  }
};


export const updateSale = async (id, saleData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(saleData),
    });
    if (!response.ok) throw new Error('Error al actualizar la venta');
    return await response.json();
  } catch (error) {
    console.error('Error en PUT:', error);
    throw error;
  }
};

export const deleteSale = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Error al eliminar la venta');
    return await response.json();
  } catch (error) {
    console.error('Error en DELETE:', error);
    throw error;
  }
};
