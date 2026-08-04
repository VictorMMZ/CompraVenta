const API_URL = 'http://localhost:8000/api/sellers/';

export const getSellers = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const getSellerbyDocument = async (document) => {
  try {
    const response = await fetch(`${API_URL}${document}/`); 
    if (!response.ok) throw new Error('Error al obtener la venta');
    return await response.json();
  } catch (error) {
    console.error('Error en GET por ID:', error);
    throw error;
  }
};