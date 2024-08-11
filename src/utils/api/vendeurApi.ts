// src/axios.ts
import api from './api';
import { Vendeur } from '@/models/vendeurs';


const newVendeur = async (vendeur : Vendeur) => {
  try{
    const response = await api.post('vendeur', vendeur);
    return response.data
  }catch(error){
    console.error('Erreur lors de la création de vendeur:', error);
  }
}

const login = async (tel: string, pwd : string) => {
  const data = { tel : tel, pwd : pwd }
  try{
    const response = await api.post('login', data);
    return response.data
  }catch(error:any){
    console.error('Echec d\'authentification :', error.response.data);
  }
}

const getAllVendeurs = async () => {
  try{
    const response = await api.get('vendeurs');
    return response.data
  }catch(error){
    console.error('Erreur lors de la fetching des vendeurs:', error);
  }
}

const deleteVendeurById = async (id:number) => {
  try{
    const response = await api.delete(`vendeur/${id}`);
    return response
  }catch(error){
    console.error('Erreur lors de la suppression du vendeur:', error);
  }
}

const getOneVendeurById = async (id:number) => {
  try{
    const response = await api.get(`vendeur/${id}`);
    return response.data
  }catch(error){
    console.error('Erreur lors de la reuperation du vendeur:', error);
  }
}

const updateVendeurById = async (vendeur : Vendeur) => {
  try{
    const response = await api.put(`vendeur/${vendeur.id}`, vendeur);
    return response.data
  }catch(error){
    console.error('Erreur lors de la mise à jour du vendeur:', error);
  }
}

export {newVendeur, getAllVendeurs, deleteVendeurById, getOneVendeurById, updateVendeurById, login};
