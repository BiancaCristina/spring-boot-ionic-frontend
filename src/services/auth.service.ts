import { Injectable } from "../../node_modules/@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "../../node_modules/@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import {JwtHelper} from 'angular2-jwt'
import { CartService } from "./domain/cart.service";


@Injectable()
export class AuthService {

    // Essa variavel vai extrair o email do token
    jwtHelper: JwtHelper = new JwtHelper();
    // Fim da variavel

    constructor (
        public http: HttpClient,
        public storage: StorageService,
        public cartService: CartService){

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
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub // Extrai o email a partir do token
        };

        this.storage.setLocalUser(user); // Armazena user no localStorage
        this.cartService.createOrClearCart(); // Limpa o carrinho
    }

    refreshToken (){
        // Metodo que autentica o user

        return this.http.post(`${API_CONFIG.baseURL}/auth/refresh_token`, 
        {},
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    logout() {
        // Esse metodo faz logout do usario
        this.storage.setLocalUser(null); // Remove user do localStorage
    }
}