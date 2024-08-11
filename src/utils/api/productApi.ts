// src/axios.ts
import { Product } from '@/models/produits';
import api from './api';


const newProduct = async (product : Product) => {
  try{
    const response = await api.post('products', product);
    return response.data
  }catch(error){
    console.error('Erreur lors de la création du produit:', error);
  }
}

const getAllProducts = async () => {
  try{
    const response = await api.get('products');
    return response.data
  }catch(error){
    console.error('Erreur lors de la fetching du produit:', error);
  }
}

const deleteProductById = async (id:number) => {
  try{
    const response = await api.delete(`products/${id}`);
    return response
  }catch(error){
    console.error('Erreur lors de la suppression du produit:', error);
  }
}

const getOneProductById = async (id:number) => {
  try{
    const response = await api.get(`products/${id}`);
    return response.data
  }catch(error){
    console.error('Erreur lors de la reuperation du produit:', error);
  }
}

const updateProductById = async (product : Product) => {
  try{
    const response = await api.put(`products/${product.id}`, product);
    return response.data
  }catch(error){
    console.error('Erreur lors de la reuperation du produit:', error);
  }
}

export {newProduct, getAllProducts, deleteProductById, getOneProductById, updateProductById};
