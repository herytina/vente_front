<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
        <ion-buttons slot="secondary">
          <ion-button>
            <ion-icon slot="icon-only" :icon="personCircle"></ion-icon>
          </ion-button>
          <ion-button>
            <ion-icon slot="icon-only" :icon="search"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <div v-if="$route.params.id === 'Panier'">
        <ProductList/>
      </div>
      <div v-if="$route.params.id === 'Produits'">
        <Manager :type="$route.params.id "/>
      </div>
      <div v-if="$route.params.id === 'Clients'">
        <Manager :type="$route.params.id "/>
      </div>
      <div v-if="$route.params.id === 'Vendeurs'">
        <Manager :type="$route.params.id "/>
      </div>
      <div v-if="$route.params.id === 'Creér un compte'">
        <CreateAccount />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonButton } from '@ionic/vue';
import ProductList from '../component/products/productList.vue';
import Manager from '../component/manager.vue';
import CreateAccount from '../component/CreateAccount.vue';
import { search, personCircle } from 'ionicons/icons';

</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
