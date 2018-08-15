import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})

export class ProdutoDetailPage {

  item: ProdutoDTO;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    // Esse metodo vai carregar os dados de cada produto

    // O comando pega o ID do produto a partir da navegacao
    let produto_id= this.navParams.get("produto_id");
    // Fim do comando

    this.produtoService.findById(produto_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists(); // Seta imagem
      },
      error => {});
  }

  getImageUrlIfExists() {
    // Esse metodo pega a URL da imagem do produto caso ela exista

    // O codigo abaixo seta a imagem do produto
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageURL = `${API_CONFIG.bucketBaseURL}/prod${this.item.id}.jpg`;
      },
      error => {});
    // Fim do codigo
  }

  addToCart(produto: ProdutoDTO) {
    // Esse metodo recebe um produtoDTO e o adiciona no carrinho
    this.cartService.addProduto(produto); // Adiciona produto no carrinho
    this.navCtrl.setRoot("CartPage"); // Redireciona pra pagina do carrinho
  }

}
