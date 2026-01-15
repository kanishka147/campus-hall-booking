const BASE_URL = "http://localhost:5000/api";

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
