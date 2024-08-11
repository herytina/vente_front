import { Clients } from "./clients";
import { Product } from "./produits";
import { Vendeur } from "./vendeurs";

// src/models/vente.ts
export interface Vente {
    id?: number;
    client: Clients;
    produits: Commande[];
    vendeur: Vendeur;
}

export interface Commande{
    produits: Product,
    nombre: number
}
