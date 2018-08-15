import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[]; // Colecao de produtos

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    // O codigo abaixo obtem o ID da categoria a partir dos dados da navegacao
    let categoria_id = this.navParams.get("categoria_id");
    // Fim do codigo

    // Esse comando acha os produtos da categoria especifica (por meio do ID)
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        // O comando abaixo pega apenas o "content" (que eh a lista de produtos) da resposta
        this.items = response["content"]; 
        // Fim do comando
      },
      error => {});
    // Fim do comando
  }
}