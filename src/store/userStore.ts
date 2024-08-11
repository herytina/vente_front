// src/stores/vendeurStore.ts
import { Vendeur } from '@/models/vendeurs';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as Vendeur,
  }),
  actions: {
    setUser(user: Vendeur) {
      this.user = user; // Définir l'utilisateur
    },
    clearUser() {
      this.user = {} as Vendeur; // Effacer l'utilisateur
    },
    updateUser(updatedUser: Vendeur) {
      this.user = { ...this.user, ...updatedUser }; // Mettre à jour les informations de l'utilisateur
    },
  },
  persist: true, // Activer la persistance
});
