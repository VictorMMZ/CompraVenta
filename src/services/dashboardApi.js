const API_URL = 'http://localhost:8000/api/dashboard';


export function getDashboardData() {
  return fetch(API_URL, {
    credentials: 'include',
  })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al obtener datos del dashboard');
        }
        return response.json();
    });
}