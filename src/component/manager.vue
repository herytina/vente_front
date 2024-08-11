<template>
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
          <ion-title>Ajouter un {{ type }}</ion-title>
          <ion-buttons slot="end">
            <ion-button v-if="!isUpdate && type === TYPE.PRODUIT" :strong="true" @click="sendProduct()">Ajouter</ion-button>
            <ion-button v-if="!isUpdate && type === TYPE.CLIENT" :strong="true" @click="sendClients()">Ajouter</ion-button>
            <ion-button v-if="!isUpdate && type === TYPE.VENDEUR" :strong="true" @click="sendVendeur()">Ajouter</ion-button>

            <ion-button v-if="isUpdate && type === TYPE.PRODUIT" :strong="true" @click="updatedProduct()">Modifier</ion-button>
            <ion-button v-if="isUpdate && type === TYPE.CLIENT" :strong="true" @click="updatedClient()">Modifier</ion-button>
            <ion-button v-if="isUpdate && type === TYPE.VENDEUR" :strong="true" @click="updatedVendeur()">Modifier</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding" v-if="type === TYPE.PRODUIT">
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
          <ion-input v-model="poids" label="Poids" label-placement="floating" fill="outline" placeholder="Poids du produit"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="totQuantiter" label="Total du quantiter" label-placement="floating" fill="outline" placeholder="Total de la quantiter du produit"></ion-input>
        </ion-item>
      </ion-content>

      <ion-content class="ion-padding" v-if="type === TYPE.CLIENT">
        <ion-item>
          <ion-input v-model="nom" label="Nom" label-placement="floating" fill="outline" placeholder="Nom du client"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="prenom" label="Prenom" label-placement="floating" fill="outline" placeholder="Prenom du client"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="mail" label="E-mail" label-placement="floating" fill="outline" placeholder="E-mail du client"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="code" label="Code client" label-placement="floating" fill="outline" placeholder="Code du client"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="ville" label="Ville" label-placement="floating" fill="outline" placeholder="Ville du client"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="region" label="Region" label-placement="floating" fill="outline" placeholder="Region du client"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="tel" label="Téléphone" label-placement="floating" fill="outline" placeholder="Téléphone du client"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="adresse" label="Adresse" label-placement="floating" fill="outline" placeholder="Adresse du client"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="codePostal" label="Code Postal" label-placement="floating" fill="outline" placeholder="Code postal du client"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="nif" label="Nif" label-placement="floating" fill="outline" placeholder="Nif du client"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="stat" label="Stat" label-placement="floating" fill="outline" placeholder="Stat du client"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="idVendeur" label="Vendeur" label-placement="floating" fill="outline" placeholder="Nom du vendeur"></ion-input>
        </ion-item>
      </ion-content>

      <ion-content class="ion-padding" v-if="type === TYPE.VENDEUR">
        <ion-item>
          <ion-input v-model="nomV" label="Nom" label-placement="floating" fill="outline" placeholder="Nom du vendeur"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="prenomV" label="Prenom" label-placement="floating" fill="outline" placeholder="Prenom du vendeur"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="telV" label="Téléphone" label-placement="floating" fill="outline" placeholder="Téléphone du vendeur"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="secteur" label="Secteur" label-placement="floating" fill="outline" placeholder="Secteur du vendeur"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="societe" label="Société" label-placement="floating" fill="outline" placeholder="Société du vendeur"></ion-input>
        </ion-item>
      </ion-content>

    </ion-modal>

    <ion-modal :is-open="modalList">
        <ion-header>
          <ion-toolbar>
            <ion-title>Liste des {{ type }}</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="close()">Fermer</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-list v-if="type === TYPE.PRODUIT">
            <ion-item v-for="(prod,i) of products" :key="i">
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=b"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>{{ prod.name }} {{  prod.quantiter }}</h2>
                <p>{{ prod.price}} ar {{ prod.poids }} KG</p>
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

          <ion-list v-if="type === TYPE.CLIENT">
            <ion-item v-for="(cli,i) of clients" :key="i">
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=b"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>{{ cli.nom }} {{  cli.prenom }}</h2>
                <p>{{ cli.tel}} ar {{ cli.adresse }} KG</p>
              </ion-label>
              <template v-if="true">
                <ion-button shape="round" color="success" @click="getClientsById(cli.id as number)">
                  <ion-icon slot="icon-only" :icon="settings"></ion-icon>
                </ion-button>
                <ion-button shape="round" color="danger" @click="deleteClient(cli.id as number)">
                  <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                </ion-button>
              </template>
            </ion-item>
          </ion-list>

          <ion-list v-if="type === TYPE.VENDEUR">
            <ion-item v-for="(vend,i) of vendeurs" :key="i">
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=b"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>{{ vend.nom }} {{  vend.prenom }}</h2>
                <p>{{ vend.secteur}} *** {{ vend.tel }}</p>
              </ion-label>
              <template v-if="true">
                <ion-button shape="round" color="success" @click="getVendeurById(vend.id as number)">
                  <ion-icon slot="icon-only" :icon="settings"></ion-icon>
                </ion-button>
                <ion-button shape="round" color="danger" @click="deleteVendeur(vend.id as number)">
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
import { deleteProductById, getAllProducts, getOneProductById, newProduct, updateProductById } from '@/utils/api/productApi';
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
  import { defineProps,ref } from 'vue';
import { Clients } from '@/models/clients';
import { deleteClientById, getAllClients, getOneClientById, newClient, updateClientById } from '@/utils/api/clientApi';
import { TYPE } from '@/utils/enum/type';
import { Vendeur } from '@/models/vendeurs';
import { deleteVendeurById, getAllVendeurs, getOneVendeurById, newVendeur, updateVendeurById } from '@/utils/api/vendeurApi';

  const props = defineProps<{ type ?: string;}>()
  const modal = ref(false);
  const modalList = ref(false);
  const isPending = ref(false);
  const isAdded = ref(false);
  const isUpdate = ref(false);
  // Parametre des produits
  const idProd = ref('')
  const name = ref(''); 
  const quantiter = ref(''); 
  const prix = ref(''); 
  const poids = ref(''); 
  const totQuantiter = ref(''); 
  const products = ref<Product[]>([]);
  // Parametre des Clients
  const idCli = ref<number>()
  const nom = ref<string>('')
  const prenom = ref<string>('')
  const mail = ref<string>('')
  const code = ref<number>()
  const ville = ref<string>('')
  const region = ref<string>('')
  const tel = ref<string>('')
  const adresse = ref<string>('')
  const codePostal = ref<number>()
  const nif = ref<number>()
  const stat = ref<number>()
  const idVendeur = ref<number>()
  const clients = ref<Clients[]>([])
  // Paramètre des Vendeurs
  const idV = ref<number>()
  const nomV = ref<string>('')
  const prenomV = ref<string>('')
  const telV = ref<string>('')
  const secteur = ref<string>('')
  const societe = ref<number>()
  const vendeurs = ref<Vendeur[]>([])

  const sendVendeur = () =>{
    isPending.value = true
    modal.value = false
    const vendeur : Vendeur = {
      nom : nomV.value,
      prenom : prenomV.value,
      tel : telV.value,
      secteur : secteur.value,
      societe : parseInt(societe.value as unknown as string)
    }
    newVendeur(vendeur).then((data) => {
      if(data){
        isAdded.value = true
        isPending.value = false
      }
    })
  }

  const sendProduct = () =>{
    isPending.value = true
    modal.value = false
    const product : Product = {
      name : name.value,
      quantiter : quantiter.value,
      price : parseInt(prix.value),
      poids : parseInt(poids.value),
      totalQuantiter : parseInt(totQuantiter.value)
    }
    newProduct(product).then((data) => {
      if(data){
        isAdded.value = true
        isPending.value = false
      }
    })
  }

  const sendClients = () => {
    isPending.value = true
    modal.value = false
    const client : Clients = {
      nom : nom.value,
      prenom : prenom.value,
      mail : mail.value,
      code : parseInt(code.value as unknown as string),
      ville : ville.value,
      region : region.value,
      tel : tel.value,
      adresse : adresse.value,
      codePostal : parseInt(codePostal.value as unknown as string),
      nif : parseInt(nif.value as unknown as string),
      stat : parseInt(stat.value as unknown as string),
      idVendeur : parseInt(idVendeur.value as unknown as string) || 1,
    }
    newClient(client).then((data) => {
      if(data){
        isAdded.value = true
        isPending.value = false
      }
    })
  }

  const openModal = () => modal.value = true;
  const openModalList = async () => {
    modalList.value = true;
    if(props.type === TYPE.PRODUIT){
      products.value = await getAllProducts()
    }else if(props.type === TYPE.CLIENT){
      clients.value = await getAllClients()
    }else if(props.type === TYPE.VENDEUR){
      vendeurs.value = await getAllVendeurs()
    }
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

  const deleteVendeur = async (id: number) => {
    const response = await deleteVendeurById(id)
    if(response?.status === 204){
      vendeurs.value = await getAllVendeurs()
      isAdded.value = true
    }
  }

  const deleteClient = async (id: number) => {
    const response = await deleteClientById(id)
    if(response?.status === 204){
      clients.value = await getAllClients()
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
    poids.value = product.poids as unknown as string
    totQuantiter.value = product.totalQuantiter as unknown as string
  }

  const getVendeurById = async(id: number) => {
    const vendeur : Vendeur = await getOneVendeurById(id);
    isUpdate.value = true
    modal.value = true
    idV.value = vendeur.id
    nomV.value = vendeur.nom
    prenomV.value = vendeur.prenom
    telV.value = vendeur.tel
    secteur.value = vendeur.secteur
    societe.value = vendeur.societe
  }

  const getClientsById = async(id: number) => {
    const client : Clients = await getOneClientById(id);
    isUpdate.value = true
    modal.value = true
    idCli.value = client.id
    nom.value = client.nom
    prenom.value = client.prenom
    mail.value = client.mail
    code.value = client.code
    ville.value = client.ville
    region.value = client.region
    tel.value = client.tel
    adresse.value = client.adresse
    codePostal.value = client.codePostal
    nif.value = client.nif
    stat.value = client.stat
  }

  const updatedClient= () => {
    isUpdate.value = false
    modal.value = false
    const client : Clients = {
      id : idCli.value,
      nom : nom.value,
      prenom : prenom.value,
      mail : mail.value,
      code : parseInt(code.value as unknown as string),
      ville : ville.value,
      region : region.value,
      tel : tel.value,
      adresse : adresse.value,
      codePostal : parseInt(codePostal.value as unknown as string),
      nif : parseInt(nif.value as unknown as string),
      stat : parseInt(stat.value as unknown as string),
      idVendeur : parseInt(idVendeur.value as unknown as string) || 1,
    }
    updateClientById(client).then(async (data) => {
      isAdded.value = true
      if(data){
        clients.value = await getAllClients() 
      }
      
    })
  }

  const updatedProduct = () => {
    isUpdate.value = false
    modal.value = false
    const product : Product = {
      id : parseInt(idProd.value),
      name : name.value,
      quantiter : quantiter.value,
      price : parseInt(prix.value),
      poids : parseInt(poids.value),
      totalQuantiter : parseInt(totQuantiter.value)
    }
    updateProductById(product).then(async (data) => {
      isAdded.value = true
      if(data){
        products.value = await getAllProducts() 
      }
      
    })
  }

  const updatedVendeur = () => {
    isUpdate.value = false
    modal.value = false
    const vendeur : Vendeur = {
      id : idV.value,
      nom : nomV.value,
      prenom : prenomV.value,
      tel : telV.value,
      secteur : secteur.value,
      societe : parseInt(societe.value as unknown as string)
    }
    updateVendeurById(vendeur).then(async (data) => {
      isAdded.value = true
      if(data){
        vendeurs.value = await getAllVendeurs() 
      }
      
    })
  }

</script>

<style scoped>

</style>