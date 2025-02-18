import type { TResponse } from 'src/interfaces/common';

import { parseCookies } from 'nookies';

const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

async function fetchApi<T, M = {}>(
  endpoint: string,
  options: RequestInit = {}
): Promise<TResponse<T, M>> {
  const cookies = parseCookies();
  const token = cookies.auth_token;

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // if (!response.ok) {
  //   throw new Error(`API error: ${response.status}`);
  // }

  return response.json();
}

export default fetchApi;
