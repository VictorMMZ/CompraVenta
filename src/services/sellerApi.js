const API_URL = 'http://localhost:8000/api/sellers';

export const getSellers = async () => {
    const response = await fetch(API_URL, {
        headers: { Accept: 'application/json' },
        credentials: 'include',
    });

    if (!response.ok) throw new Error('Error al obtener vendedores');

    return response.json();
};

export const getSellerbyDocument = async (document) => {
    const response = await fetch(`${API_URL}/${document}`, {
        headers: { Accept: 'application/json' },
        credentials: 'include',
    });

    if (!response.ok) throw new Error('Error al obtener el vendedor');

    return response.json();
};

export const createSeller = async (sellerData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(sellerData)
    });

    if (!response.ok) throw new Error('Error al crear el vendedor');

    return response.json();
};