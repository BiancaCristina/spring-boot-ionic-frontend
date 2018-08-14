import { Injectable } from "../../node_modules/@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "../../node_modules/@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageServices } from "./storage.service";


@Injectable()
export class AuthService {
    constructor (
        public http: HttpClient,
        public storage: StorageServices){

    }

    autenthicate(creds: CredenciaisDTO){
        // Metodo que autentica o user

        return this.http.post(`${API_CONFIG.baseURL}/login`, 
        creds,
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    successfulLogin(authorizationValue: string) {
        // Esse metodo verifica se o login foi bem sucedido
        let tok = authorizationValue.substring(7); // Remove o "Bearer " do token
        let user: LocalUser = {
            token: tok
        };

        this.storage.setLocalUser(user); // Armazena user no localStorage
        
    }

    logout() {
        // Esse metodo faz logout do usario
        this.storage.setLocalUser(null); // Remove user do localStorage
    }
}