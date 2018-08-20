import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient, HttpHeaders } from "../../../node_modules/@angular/common/http";
import { Observable } from "../../../node_modules/rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class ClienteService {
    
    constructor(
        public http: HttpClient,
        public storage: StorageService,
        public imagemUtilService: ImageUtilService){

    }

    findByEmail(email: string): Observable<ClienteDTO> {       
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseURL}/clientes/email?value=${email}`);
    }

    findById(id: string): Observable<ClienteDTO> {       
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseURL}/clientes/${id}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        // Esse metodo busca a imagem do cliente no bucket da Amazon
        let url = `${API_CONFIG.bucketBaseURL}/cp${id}.jpg`

        // Esse "blob" indica que eh uma imagem e nao um JSON
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : ClienteDTO) {
        // Esse metodo insere um novo cliente
        
        return this.http.post(
            `${API_CONFIG.baseURL}/clientes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    uploadPicture(picture) {
        // Esse metodo upa a imagem pro bucket da amazon

        // O comando abaixo converte a imagem de base64 pra blob
        let pictureBlob = this.imagemUtilService.dataUriToBlob(picture);
        // Fim do comando

        // O comando abaixo acerta a imagem para que ela possa ser enviada pro bucket
        // A imagem eh enviada como FormData, por isso preciso dessa variavel
        let formData: FormData = new FormData();
        formData.set("file", pictureBlob,"file.png"); 
        // Fim do comando

        // O codigo abaixo envia a imagem
        return this.http.post(
            `${API_CONFIG.baseURL}/clientes/picture`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
        // Fim do codigo 
    }
}