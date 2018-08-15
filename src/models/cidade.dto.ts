import { EstadoDTO } from "./estado.dto";

export interface CidadeDTO {
    id: string;
    nome: string;
    estado?: EstadoDTO; // Coloco o estado como opcional para nao dar bug naquilo de buscar as cidades sem ter estado anexado a cidade 

}