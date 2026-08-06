const API_URL = 'http://127.0.0.1:8000/api/dashboard';


export function getDashboardData() {
  return fetch(API_URL)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al obtener datos del dashboard');
        }
        return response.json();
    });
}