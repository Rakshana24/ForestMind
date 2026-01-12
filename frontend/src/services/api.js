const API_URL = "http://localhost:5000";

export async function login(data) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function getDistricts() {
  const response = await fetch(`${API_URL}/districts`);
  return response.json();
}

export async function getForests(district) {
  const response = await fetch(`${API_URL}/forests/${district}`);
  return response.json();
}

export async function getOffices(forest) {
  const response = await fetch(`${API_URL}/offices/${forest}`);
  return response.json();
}
