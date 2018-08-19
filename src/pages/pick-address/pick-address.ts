import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[]; // Lista de enderecos do cliente

  pedido: PedidoDTO; // Pedido 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser(); // Pega o localUser

    if (localUser && localUser.email) {
      // Se esse localUser nao for nulo e possuir o campo email, entao
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos']; // Povoa a lista de enderecos com os enderecos que vieram no response
          
          let cart = this.cartService.getCart(); // Pega o carrinho armazenado no localStorage
          
          // O codigo abaixo vai povoar o pedido
          this.pedido = {
            cliente: {id: response["id"]}, // Pega apenas o ID pra preencher o refDTO
            enderecoDeEntrega: null,// Ainda nao sei qual endereco
            pagamento: null, // Ainda nao sei qual pagamento
            
            // O codigo abaixo pega cada item "x" da lista "items"
            // Em seguida, usa esses "x" para povoar itens (com ID do produto e quantidade)
            // Esse comando eh um lambda
            itens: cart.items.map(x => {return {quantidade:x.quantidade , produto: {id: x.produto.id} } })
            // Fim do codigo
          }
          // Fim do codigo
        },
        error => {
          if (error.status == 403) {
            // Caso de o erro 403 (acesso negado), redireciona pra pagina home
            this.navCtrl.setRoot('HomePage'); // Redireciona pra pagina home
          }
        });
    }

    else {
      // Caso de algum problema com o localUser, redireciona para a pagina home
      this.navCtrl.setRoot('HomePage'); // Redireciona pra pagina home
    }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id}; // Pega a RefDTO (id do endereco)
    
    // O comando abaixo "empilha" a pagina de Pagamento e envia o pedido como parametro de navegacao
    this.navCtrl.push("PaymentPage", {pedido: this.pedido});
    // Fim do comando
  }

}
