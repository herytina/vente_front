<template>
    <ion-list>
      <ion-item>
        <ion-input v-model="user" label="Numero téléphone" placeholder="Enter text"></ion-input>
      </ion-item>
  
      <ion-item>
        <ion-input v-model="pwd" type="password" label="Password" value="NeverGonnaGiveYouUp">
            <ion-input-password-toggle slot="end"></ion-input-password-toggle>
        </ion-input>        
      </ion-item>

        <ion-button expand="block" @click="handleLogIn()">
            <ion-icon slot="start" :icon="logIn"></ion-icon>
            Connecter
        </ion-button>

        <ion-item>
          <ion-label @click="createAccount()">Creér un compte ?</ion-label>
          <ion-label slot="end"  @click="resetPassWord()">Mots de passe oublié ?</ion-label>
        </ion-item>

    </ion-list>
  </template>
  
  <script setup lang="ts">
    import { IonInput, IonItem, IonList, IonInputPasswordToggle, IonButton, IonIcon, IonLabel } from '@ionic/vue';
    import { logIn } from 'ionicons/icons'
    import { useRouter } from 'vue-router'
    import { ref } from 'vue';
    const user = ref<string>('')
    const pwd = ref<string>('')
    const route = useRouter()
    import { useUserStore } from '../store/userStore';
    import { login } from '@/utils/api/vendeurApi';

    const userStore = useUserStore();
    const { setUser } = userStore
    const handleLogIn = () => {
      login(user.value, pwd.value).then(data => {
        if(data){
          setUser(data)
          route.push('/sales/Panier')
        }
      })
    }

    const resetPassWord = () => {

    }

    const createAccount = () => {
      route.push('/sales/Creér un compte')
    }
  </script>