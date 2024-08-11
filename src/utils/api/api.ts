import axios from 'axios';

// Créez une instance d'Axios avec la configuration de votre API
const api = axios.create({
  baseURL: 'http://localhost:3000/api/', // Remplacez par l'URL de votre API
  timeout: 1000,
});

export default api;