<template>
    <ion-button expand="block" fill="outline">Modifier / supprimer</ion-button>
    <ion-button expand="block" fill="outline">Ajouter</ion-button>
    <ion-button expand="block" fill="outline">Voir</ion-button>
  </template>
  
  <script lang="ts">
    import { IonButton } from '@ionic/vue';
    import { defineComponent } from 'vue';
  
    export default defineComponent({
        name : 'ProductManager',
      components: { IonButton },
    });
  </script>