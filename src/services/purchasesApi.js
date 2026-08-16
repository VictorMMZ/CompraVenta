const API_URL = 'http://localhost:8000/api/purchases';

export const getPurchases = async () => {
    const response = await fetch(API_URL, {
        headers: { Accept: 'application/json' },
        credentials: 'include',
    });
    if (!response.ok) throw new Error('Error al obtener compras');
    return response.json();
};

export const getPurchaseById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        headers: { Accept: 'application/json' },
        credentials: 'include',
    });
    if (!response.ok) throw new Error('Error al obtener la compra');
    return response.json();
};

export const createPurchase = async (purchaseData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(purchaseData),
    });
    if (!response.ok) throw new Error('Error al crear la compra');
    return response.json();
};

export const updatePurchase = async (id, purchaseData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            
        },
        credentials: 'include',
        body: JSON.stringify(purchaseData),
    });
    if (!response.ok) throw new Error('Error al actualizar la compra');
    return response.json();
};

export const deletePurchase = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
        credentials: 'include',
    });
    if (!response.ok) throw new Error('Error al eliminar la compra');
    return response.json();
};