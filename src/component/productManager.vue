<template>
    <ion-button expand="block" fill="outline">Modifier / supprimer</ion-button>
    <ion-button expand="block" fill="outline" @click="openModal()">Ajouter</ion-button>
    <ion-button expand="block" fill="outline" @click="openModalList()">Voir</ion-button>

    <ion-loading :is-open="isPending" :duration="3000" message="Dismissing after 3 seconds..."> </ion-loading>

    <ion-toast :is-open="isAdded" message="Mise à jour du produits effectuer" :duration="5000"></ion-toast>

    <ion-modal :is-open="modal">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Annuler</ion-button>
          </ion-buttons>
          <ion-title>Ajouter un produit</ion-title>
          <ion-buttons slot="end">
            <ion-button v-if="!isUpdate" :strong="true" @click="sendProduct()">Ajouter</ion-button>
            <ion-button v-if="isUpdate":strong="true" @click="updatedProduct()">Modifier</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-input v-model="name" label="Nom" label-placement="floating" fill="outline" placeholder="Nom du produit"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="quantiter" label="Quantiter" label-placement="floating" fill="outline" placeholder="Quantiter du produit"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="prix" label="Prix" label-placement="floating" fill="outline" placeholder="Prix du produit"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="nombre" label="Stock" label-placement="floating" fill="outline" placeholder="Nomber en stock du produit"></ion-input>
        </ion-item>
      </ion-content>
    </ion-modal>

    <ion-modal :is-open="modalList">
        <ion-header>
          <ion-toolbar>
            <ion-title>Liste des produits</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="close()">Fermer</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-list>
            <ion-item v-for="(prod,i) of products" :key="i">
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=b"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>{{ prod.name }} {{  prod.quantiter }}</h2>
                <p>{{ prod.price}} ar {{ prod.stock }} restants</p>
              </ion-label>
              <template v-if="true">
                <ion-button shape="round" color="success" @click="getProductById(prod.id as number)">
                  <ion-icon slot="icon-only" :icon="settings"></ion-icon>
                </ion-button>
                <ion-button shape="round" color="danger" @click="deleteProduct(prod.id as number)">
                  <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                </ion-button>
              </template>
              
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-modal>
  </template>
  
<script setup lang="ts">
  import { Product } from '@/models/produits';
import { deleteProductById, getAllProducts, getOneProductById, newProduct, updateProductById } from '@/utils/api';
import { settings, trash } from 'ionicons/icons';
import { IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
    IonToast,
    IonLoading,
    IonList,
    IonAvatar,
    IonImg,
    IonLabel,
    IonIcon
  } from '@ionic/vue';
  import { ref } from 'vue';


  const modal = ref(false);
  const modalList = ref(false);
  const isPending = ref(false);
  const isAdded = ref(false);
  const isUpdate = ref(false);
  const idProd = ref('')
  const name = ref(''); 
  const quantiter = ref(''); 
  const prix = ref(''); 
  const nombre = ref(''); 
  const products = ref<Product[]>([]);

  const sendProduct = () =>{
    isPending.value = true
    modal.value = false
    const product : Product = {
      name : name.value,
      quantiter : quantiter.value,
      price : parseInt(prix.value),
      stock : parseInt(nombre.value)
    }
    newProduct(product).then((data) => {
      if(data){
        isAdded.value = true
        isPending.value = false
      }
    })
    
  }

  const openModal = () => modal.value = true;
  const openModalList = async () => {
    modalList.value = true;
    products.value = await getAllProducts()
  }
  const cancel = () => modal.value = false;
  const close = () => modalList.value = false;
  const deleteProduct = async (id: number) => {
    const response = await deleteProductById(id)
    if(response?.status === 204){
      products.value = await getAllProducts()
      isAdded.value = true
    }
  }

  const getProductById = async(id: number) => {
    const product : Product = await getOneProductById(id);
    isUpdate.value = true
    modal.value = true
    idProd.value = product.id as unknown as string
    name.value = product.name
    quantiter.value = product.quantiter
    prix.value = product.price as unknown as string
    nombre.value = product.stock as unknown as string
  }

  const updatedProduct = () => {
    isUpdate.value = false
    modal.value = false
    const product : Product = {
      id : parseInt(idProd.value),
      name : name.value,
      quantiter : quantiter.value,
      price : parseInt(prix.value),
      stock : parseInt(nombre.value)
    }
    updateProductById(product).then(async (data) => {
      isAdded.value = true
      if(data){
        products.value = await getAllProducts() 
      }
      
    })
  }

</script>

<style scoped>

</style>