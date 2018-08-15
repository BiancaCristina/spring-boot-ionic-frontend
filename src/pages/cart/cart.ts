import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[]; // Colecao de itens de carrinho

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    // Esse metodo carrega os itens do carrinho
    
    let cart = this.cartService.getCart(); // Pega o carrinho que esta armazenado
    this.items = cart.items; // Recebe os itens que estao no carrinho
    this.loadImageUrls(); // Carrega as imagens dos produtos do carrinho 
  }

  loadImageUrls() {
    // Esse metodo carrega as imagens (small) de cada produto (caso possua)
    // Eh bem parecido com os do produto.ts

    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageURL = `${API_CONFIG.bucketBaseURL}/prod${item.produto.id}-small.jpg`;
        },
        error => {});
    }
  }
  
  removeItem(produto: ProdutoDTO) {
    // Esse metodo remove itens do carrinho a partir do cartService
    this.items = this.cartService.removeProduto(produto) // Essa primeira parte acessa o cartService, remove um produto do carrinho e retorna o carrinho
                .items; // Essa parte aqui pega o carrinho, pega os itens dele e adiciona na minha colecao de CartItem chamada "items"
  }

  increaseQuantity(produto: ProdutoDTO) {
    // Esse metodo segue a mesma logica do "RemoveItem", mas so que para incrementar
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    // Esse metodo segue a mesma logica do "RemoveItem", mas so que para decrementar
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total() : number {
    // Esse metodo retorna o valor total da compra a partir do cartService
    return this.cartService.total();
  }  

  goOn() {
    this.navCtrl.setRoot('CategoriasPage'); // Redireciona para a pagina de categorias
  }

  checkout() {
    // Esse metodo finaliza o pedido

    this.navCtrl.push("PickAddressPage"); // Redireciona para pagina que escolhe o endereco
  }
}
