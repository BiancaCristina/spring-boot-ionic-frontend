import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

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
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    // Esse metodo era o ViewDidLoad

    // O codigo abaixo obtem o ID da categoria a partir dos dados da navegacao
    let categoria_id = this.navParams.get("categoria_id");
    // Fim do codigo

    // Esse comando acha os produtos da categoria especifica (por meio do ID)
    let loader = this.presentLoading(); // Variavel de carregamento da pagina

    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        // O comando abaixo pega apenas o "content" (que eh a lista de produtos) da resposta
        this.items = response["content"]; 
        // Fim do comando

        loader.dismiss(); // Fecha a tela de carregamento

        // O comando abaixo carrega as imagens dos produtos
        this.loadImageUrls();
        // Fim do comando
      },
      error => {
        loader.dismiss(); // Fecha a tela de carregamento
      });
    // Fim do comando
  }

  loadImageUrls() {
    // Esse metodo carrega a imagem do produto (produtoDTO)

    // O codigo abaixo seta a imagem de cada produto
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i]; // Essa variavel recebe um por um dos itens da colecao "items"
      
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageURL = `${API_CONFIG.bucketBaseURL}/prod${item.id}-small.jpg`;
          // Caso o produto nao tenha imagemURL, nao vai carregar essa imagem "small" e sim aquela "prod" (sem imagem de produto)
        },
        error => {});
    }
    // Fim do codigo
  }
  
  showDetail(produto_id: string){
    // Esse metodo mostra os detalhes de um produto
    this.navCtrl.push("ProdutoDetailPage", {produto_id: produto_id});
  }

  presentLoading() {
    // Esse metodo controla o loading da pagina (carregar)
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    loader.present();
    return loader; // Retorno o loading pra que eu possa acessar ele pra fechar quando necessario 
  }

  doRefresh(refresher) {
    this.loadData(); // Recarrega os dados
    setTimeout(() => {
      // Essa funcao executa alguma coisa depois daquele tempo ali embaixo, no caso "1000ms" (1s)
      refresher.complete(); // Fecha o refresher depois de 1000ms/1s
    }, 1000);
  }

}