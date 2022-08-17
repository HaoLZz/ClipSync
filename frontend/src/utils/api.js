import axios from 'axios';

export default async function apiRequest(
  url = '',
  method,
  payload = {},
  options = {},
) {
  switch (method) {
    case 'GET': {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options,
        },
      };

      const response = await axios.get(url, config);
      return response.data;
    }
    case 'POST': {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options,
        },
      };

      const response = await axios.post(url, payload, config);
      return response.data;
    }
    case 'PATCH': {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options,
        },
      };

      const response = await axios.patch(url, payload, config);
      return response.data;
    }
    default:
      new Error(`Unknown requst method: ${method}`);
  }
}
