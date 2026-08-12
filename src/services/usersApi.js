const API_URL = 'http://127.0.0.1:8000/api/users';

export const getUsers = async () => {
    const response = await fetch(API_URL, {
        headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error('Error al obtener usuarios');

    return response.json();
};

export const getUserbyDocument = async (document) => {
    const response = await fetch(`${API_URL}/${document}`, {
        headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error('Error al obtener el usuario');

    return response.json();
};

export const createUser = async (userData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) throw new Error('Error al crear el usuario');

    return response.json();
};

export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${API_URL}/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Error al actualizar el usuario');
    return await response.json();
  } catch (error) {
    console.error('Error en PUT:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar el usuario');
    return await response.json();
  } catch (error) {
    console.error('Error en DELETE:', error);
    throw error;
  }
};
