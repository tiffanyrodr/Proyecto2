const BASE_URL = "https://raw.githubusercontent.com/openfootball/world-cup.json/master/2026";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const fetchClient = {
  get<T>(path: string): Promise<T> {
    return request<T>(path);
  },
};