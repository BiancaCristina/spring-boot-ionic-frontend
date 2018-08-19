import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { PedidoDTO } from "../../models/pedido.dto";

@Injectable()// Essa anotacao eh usada para que essa classe possa ser injetada em outras classes
export class PedidoService {
    
    constructor(public http: HttpClient){
        // Esse httpClient eh injetado
    }

    insert(obj: PedidoDTO){
        // Esse metodo insere um pedido no BD

        return this.http.post(
            `${API_CONFIG.baseURL}/pedidos`,
            obj,
            {
                observe: 'response',
                responseType: 'text' // Evitar que a API entenda como um JSON
            }
        );
    }
}