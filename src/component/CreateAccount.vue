<template>
        <ion-item>
          <ion-input v-model="user.nom" label="Nom" label-placement="stacked" placeholder="Nom">
            <ion-icon slot="start" :icon="person" aria-hidden="true"></ion-icon>
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="user.prenom" label="Prenom" label-placement="stacked" placeholder="Prenom">
            <ion-icon slot="start" :icon="person" aria-hidden="true"></ion-icon>
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="user.tel" label="Téléphone" label-placement="stacked" placeholder="Téléphone">
            <ion-icon slot="start" :icon="call" aria-hidden="true"></ion-icon>
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="user.secteur" label="Secteur" label-placement="stacked" placeholder="Secteur">
            <ion-icon slot="start" :icon="pin" aria-hidden="true"></ion-icon>
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="user.societe" label="Société" label-placement="stacked" placeholder="Société">
            <ion-icon slot="start" :icon="planet" aria-hidden="true"></ion-icon>
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="user.pwd" label="Mots de passe" label-placement="stacked"placeholder="Société">
            <ion-icon slot="start" :icon="lockClosed" aria-hidden="true"></ion-icon>
            <ion-input-password-toggle slot="end"></ion-input-password-toggle>
          </ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="confirmPwd" label="Comfirmer le mots de passe" label-placement="stacked" placeholder="Société">
            <ion-icon slot="start" :icon="lockClosed" aria-hidden="true"></ion-icon>
            <ion-input-password-toggle slot="end"></ion-input-password-toggle>
          </ion-input>
        </ion-item>

        <ion-button expand="block" @click="handleCreate()">
            <ion-icon slot="start" :icon="add"></ion-icon>
            Creér
        </ion-button>

        <ion-toast
          :is-open="isAdded"
          message="Compte creér avec succeés"
          :duration="5000"
      ></ion-toast>
</template>

<script setup lang="ts">
import { IonInput, IonItem, IonInputPasswordToggle, IonButton, IonIcon, IonToast } from '@ionic/vue';
import {lockClosed, planet, pin, call, person, add} from 'ionicons/icons'
import { Vendeur } from '@/models/vendeurs';
import { ref } from 'vue';
import { newVendeur } from '@/utils/api/vendeurApi';
import { useRouter } from 'vue-router';

const user = ref<Vendeur>({
  nom: '',
  prenom: '',
  tel: '',
  secteur: '',
  societe: 0,
  pwd : ''
})
const confirmPwd = ref<string>('')
const router = useRouter()
const isAdded = ref(false)
const handleCreate = async () => {
    if(confirmPwd.value === user.value?.pwd && user.value.tel.length === 10 && user.value.pwd.length >= 4){
        const respons = await newVendeur(user.value);
        if(respons){
          isAdded.value = true
          setTimeout(()=> {
            isAdded.value = false
            router.push('/')
          }, 2000)
        }
    }
}
</script>