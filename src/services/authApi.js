export function logout() {
  return fetch('http://localhost:8000/api/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  
}