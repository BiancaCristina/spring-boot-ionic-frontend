import { RefDTO } from "./ref.dto";

export interface ItemPedidoDTO {
    quantidade: number;
    produto: RefDTO; // So faz a referencia ao produto usando o ID dele e instanciando como "RefDTO"
}