const API_BASE = 'http://localhost:8000/api';

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = localStorage.getItem('access_token');
  
  const headers: Record<string, string> = {
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && endpoint !== '/auth/login/') {
    // Basic logout on unauthorized for now
    localStorage.removeItem('access_token');
    window.location.reload();
  }

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    const errorData = (() => {
      try {
        return JSON.parse(text);
      } catch {
        return null;
      }
    })();
    const message = errorData?.error || errorData?.detail || text || `Error en la petición (${response.status})`;
    throw new Error(message);
  }

  return response.json();
}

export const api = {
  get: <T>(url: string) => request<T>(url, { method: 'GET' }),
  post: <T>(url: string, data: any) => request<T>(url, { method: 'POST', body: JSON.stringify(data) }),
  postForm: <T>(url: string, form: FormData) => request<T>(url, { method: 'POST', body: form }),
  put: <T>(url: string, data: any) => request<T>(url, { method: 'PUT', body: JSON.stringify(data) }),
  delete: <T>(url: string) => request<T>(url, { method: 'DELETE' }),

getFile: async (endpoint: string) => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'GET',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) throw new Error(`Error al descargar (${response.status})`);

    // Extraer el nombre del archivo que envía Django
    const disposition = response.headers.get('Content-Disposition');
    let filename = 'documento.pdf';
    
    if (disposition && disposition.indexOf('attachment') !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }
    }

    const blob = await response.blob();
    return { blob, filename };
  }
};
