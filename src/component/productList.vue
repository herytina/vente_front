<template>
    <ion-card>
      <ion-card-header>
        <ion-card-title>Card Title</ion-card-title>
        <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
      </ion-card-header>
  
      <ion-card-content>
        Here's a small text description for the card content. Nothing more, nothing less.
      </ion-card-content>
    </ion-card>

    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button>
        <ion-icon :icon="chevronUpCircle"></ion-icon>
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
  
  <script lang="ts">
    import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import {
    chevronUpCircle,
    colorPalette,
    document,
    globe,
  } from 'ionicons/icons';
  
    export default defineComponent({
        name: 'ProductList',
        components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,  IonFab, IonFabButton, IonFabList, IonIcon },
        setup() {
            return { chevronUpCircle, colorPalette, document, globe };
        },
    });
  </script>