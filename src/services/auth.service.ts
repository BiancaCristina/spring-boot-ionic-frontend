import { Injectable } from "../../node_modules/@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "../../node_modules/@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthService {
    constructor (public http: HttpClient){

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
}