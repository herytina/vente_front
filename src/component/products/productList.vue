<template>
 <ion-list>
    <ion-item>
      <ion-select label="Clients" v-model="selectedClientId" @ionChange="handleClientChange">
        <ion-select-option v-for="(cli, i) of clients" :key="i" :value="cli.id">{{ cli.nom}} {{ cli.prenom }}</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
    
    <ion-card v-for="(prod, i) of products" :key="i">
      <ion-card-header>
        <ion-card-title>{{ prod.name }} {{ prod.quantiter}} </ion-card-title>
        <ion-card-subtitle>{{ prod.price}} ariary</ion-card-subtitle>
      </ion-card-header>
  
      <ion-card-content>
        Poids : {{ prod.poids }} KG, Total : {{ prod.totalQuantiter }} KG
        <ion-input v-model="nbCom[i]" label="nombre" label-placement="floating" fill="outline"></ion-input>

        <template v-if="true">
          <ion-button slot="end" shape="round" color="success" @click="getProductById(prod,i)">
            <ion-icon :icon="settings"></ion-icon>
            Ajouter
          </ion-button>
        </template>
      </ion-card-content>
    </ion-card>

    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button>
        <ion-icon :icon="cart"></ion-icon>
        <ion-badge class="badge" color="success" v-if="commande.length > 0">{{ commande.length }}</ion-badge>
      </ion-fab-button>
      <ion-fab-list side="top">
        <ion-fab-button>
          <ion-icon :icon="document"></ion-icon>
        </ion-fab-button>
        <ion-fab-button>
          <ion-icon :icon="colorPalette"></ion-icon>
        </ion-fab-button>
        <ion-fab-button>
          <ion-icon :icon="globe"></ion-icon>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>
  </template>
  
  <script setup lang="ts">
    import { IonCard,IonButton, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonFab, IonBadge, IonFabButton, IonFabList, IonIcon, IonInput, IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/vue';
    import { onMounted, ref } from 'vue';
    import {
      cart,
    colorPalette,
    document,
    globe,
    settings
  } from 'ionicons/icons';
  import { Product } from '@/models/produits';
  import { getAllProducts } from '@/utils/api/productApi';
  import { Clients } from '@/models/clients';
  import { getAllClients } from '@/utils/api/clientApi';
  import { Commande, Vente } from '@/models/vente';
import { useUserStore } from '@/store/userStore';
import { Vendeur } from '@/models/vendeurs';
  const products = ref<Product[]>([])
  const clients  = ref<Clients[]>([])
  const clientSelected = ref<Clients>()
  const commande = ref<Commande[]>([])
  const nbCom = ref<number[]>([])
  const selectedClientId = ref(null);
  const userStore = useUserStore()
  const saler = ref<Vendeur>()

  onMounted(async () => {
    products.value = await getAllProducts()
    clients.value = await getAllClients()
    nbCom.value = new Array(products.value.length).fill(1);
    saler.value = userStore.user
  })
  const getProductById = (prod: Product, i:number) => {
    const existingIndex = commande.value.findIndex(c => c.produits.id === prod.id);
    const newCommande = { produits: prod, nombre: parseInt(nbCom.value[i] as unknown as string) };
    if (existingIndex !== -1) {
    commande.value[existingIndex] = newCommande;
    } else {
      commande.value.push(newCommande);
    }

    const vente : Vente = {
      client : clientSelected.value as Clients,
      produits : commande.value,
      vendeur : saler.value as Vendeur
    }
    
    console.log('Vente', vente);
    
  }
  const handleClientChange = (event: any) => {
    clientSelected.value = clients.value.find(cli => cli.id === selectedClientId.value);
  };
  </script>

  <style scoped>
</style>