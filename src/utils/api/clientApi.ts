// src/axios.ts
import { Clients } from '@/models/clients';
import api from './api';


const newClient = async (client : Clients) => {
  try{
    const response = await api.post('client', client);
    return response.data
  }catch(error){
    console.error('Erreur lors de la création de client:', error);
  }
}

const getAllClients = async () => {
  try{
    const response = await api.get('clients');
    return response.data
  }catch(error){
    console.error('Erreur lors de la fetching des clients:', error);
  }
}

const deleteClientById = async (id:number) => {
  try{
    const response = await api.delete(`client/${id}`);
    return response
  }catch(error){
    console.error('Erreur lors de la suppression du client:', error);
  }
}

const getOneClientById = async (id:number) => {
  try{
    const response = await api.get(`client/${id}`);
    return response.data
  }catch(error){
    console.error('Erreur lors de la reuperation du client:', error);
  }
}

const updateClientById = async (client : Clients) => {
  try{
    const response = await api.put(`client/${client.id}`, client);
    return response.data
  }catch(error){
    console.error('Erreur lors de la mise à jour du client:', error);
  }
}

export {newClient, getAllClients, deleteClientById, getOneClientById, updateClientById};
