import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient, HttpHeaders } from "../../../node_modules/@angular/common/http";
import { Observable } from "../../../node_modules/rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {
    
    constructor(
        public http: HttpClient,
        public storage: StorageService){

    }

    findByEmail(email: string): Observable<ClienteDTO> {

        // Variveis temporarias para passar o Header de autorizacao na requisicao
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
        // Fim das variaveis temporarias 
        
        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseURL}/clientes/email?value=${email}`,
            {'headers': authHeader});
    }

    getImageFromBucket(id : string) : Observable<any> {
        // Esse metodo busca a imagem do cliente no bucket da Amazon
        let url = `${API_CONFIG.bucketBaseURL}/cp${id}.jpg`

        // Esse "blob" indica que eh uma imagem e nao um JSON
        return this.http.get(url, {responseType : 'blob'});
    }
}