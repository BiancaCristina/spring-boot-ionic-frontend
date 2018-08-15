import { Injectable } from "../../node_modules/@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import { Cart } from "../models/cart";

@Injectable()
export class StorageService {
    getLocalUser(): LocalUser{
        let usr = localStorage.getItem(STORAGE_KEYS.localUser); // Pego o valor do localStorage que possua a chave passada como parametro

        if (usr == null){
            // Se o usuario nao existir, retorno null
            return null;
        }

        else {
            // Caso exista: 
            // Como meu localStorage estava armazenando string, preciso converter em JSON
            // Logo, retorno o usr convertido em JSON
            return JSON.parse(usr); 
        }
    }

    setLocalUser(obj: LocalUser) {
        // Armazena o localUser e seta ele no storage
        if (obj == null) {
            // Se o objeto for nulo, removo ele
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }

        else {
            // Caso nao seja nulo
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
            // O comando JSON.stringify(obj) converte um JSON em string porque o localStorage armazena como string
        }
    }

    getCart() : Cart {
        // Segue a mesma logica do localUser
        let str = localStorage.getItem(STORAGE_KEYS.cart);
        if (str != null) {
            return JSON.parse(str);
        }
        else {
            return null;
        }
    }
    
    setCart(obj : Cart) {
        // Segue a mesma logica do localUser
        if (obj != null) {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        } 
        else {
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
    }
}