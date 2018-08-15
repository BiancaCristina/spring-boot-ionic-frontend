import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "../../../node_modules/rxjs/Rx";
import { CidadeDTO } from "../../models/cidade.dto";

@Injectable()// Essa anotacao eh usada para que essa classe possa ser injetada em outras classes
export class CidadeService {
    
    constructor(public http: HttpClient){
        // Esse httpClient eh injetado
    }

    findAll(estado_id: string): Observable<CidadeDTO[]> {
        // Precisa colocar esse "Observable" porque ele possibilita que eu faça a requisicao e fique aguardando a resposta
        // Alem disso, o "Observable" eh usado porque o Angular encapsula o mecanismo de requisicao assincrona por meio do "Observable"
        // Esse metodo retorna a lista de CategoriaDTO
        // Esse "baseURL" veio do api.config.ts
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseURL}/estados/${estado_id}/cidades`);
    }
}