<template>
    <ion-input label="Outline input" label-placement="floating" fill="outline" placeholder="Enter text"></ion-input>
    <ion-input label="Outline input" label-placement="floating" fill="outline" placeholder="Enter text"></ion-input>
    <ion-input label="Outline input" label-placement="floating" fill="outline" placeholder="Enter text"></ion-input>
    <ion-input label="Outline input" label-placement="floating" fill="outline" placeholder="Enter text"></ion-input>

    <ion-button expand="block" fill="outline">Enregistrer</ion-button>

</template>

<script lang="ts">
import { IonInput, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { IonInput, IonButton },
});
</script>