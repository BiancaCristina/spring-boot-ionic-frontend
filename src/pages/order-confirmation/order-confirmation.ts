import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO; // Pedido
  cartItems: CartItem[]; // Itens do carrinho
  cliente: ClienteDTO; // Cliente
  endereco: EnderecoDTO; // Endereco

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService) {

      // Esse comando passa o pedido como parametro de navegacao entre as paginas
      this.pedido = this.navParams.get('pedido');
      // Fim do comando

  }

  ionViewDidLoad() {
    // Esse codigo pega os itens do carrinho
    this.cartItems = this.cartService.getCart().items;
    // Fim do codigo

    // Esse comando busca o cliente pelo ID associado ao pedido
    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO; // Pega apenas os dados do objeto Cliente que sao iguais ao ClienteDTO
        
        // O comando abaixo seta o endereco dessa ordem
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
        // Fim do comando 
      },
      error => {
        // Se der errado, provavelmente eh algo relacionado a autenticacao
        this.navCtrl.setRoot('HomePage'); // Redireciona pra proxima pagina 
      } );
    // Fim do comando
  }

  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    // Esse metodo recebe a lista de EnderecoDTO do Cliente e faz uma busca
    // Nessa busca, ele procura o endereco que possui o mesmo id do cliente que fez o pedido
    
    let position = list.findIndex(x => x.id == id); // Acha a posicao que possui mesmo ID
    return list[position]; // Retorna o endereco que eu procuro
  }

  total() {
    return this.cartService.total(); // Retorna o total do pedido
  }

  checkout() {
    // Esse metodo finaliza o pedido

    // Esse codigo insere o pedido no BD
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart(); // Limpa o carrinho
        // Codigo temporario pra mostrar o locaote
        console.log(response.headers.get("location"));
        // Fim do codigo
      },
      error => {
        if (error.status == 403) {
          // Problema de autenticacao ou autorizacao
          this.navCtrl.setRoot("HomePage"); // Redireciona pra pagina inicial
        }
      });
    // Fim do codigo
  }

  back() {
    this.navCtrl.setRoot("CartPage");
  }

}
