// api.ts
import axios from 'axios';
import https from 'https';

// Configura Axios para ignorar la validación de certificados en entornos de desarrollo
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // La URL base se extrae de las variables de entorno
  headers: {
    'Content-Type': 'application/json',
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Ignorar validación del certificado
  }),
});

export default api;
