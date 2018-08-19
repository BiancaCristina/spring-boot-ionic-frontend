import { RefDTO } from "./ref.dto";
import { PagamentoDTO } from "./pagamento.dto";
import { ItemPedidoDTO } from "./item-pedido.dto";

export interface PedidoDTO {
    cliente: RefDTO; // Pega apenas o ID que referencia o cliente 
    pagamento: PagamentoDTO;
    enderecoDeEntrega: RefDTO; // Pega apenas ID que referencia o endereco
    itens: ItemPedidoDTO[]; // Lista de itens pedidos
}