import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

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

}
