const API_URL = "https://campus-hall-backend.onrender.com/api";
const BASE_URL = "https://campus-hall-backend.onrender.com/api";

export async function loginUser(role, email, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role, email, password }),
  });

  const data = await response.json();
  return data;
}
