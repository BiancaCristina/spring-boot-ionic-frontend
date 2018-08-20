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

  items : ProdutoDTO[] = []; // Colecao de produtos, inicia vazia
  page: number = 0; // Primeira page


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

    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        let start = this.items.length; // Guarda o tamanho inicial da lista antes de concatenar

        // O comando abaixo pega apenas o "content" (que eh a lista de produtos) da resposta
        // Por causa do infinite scroll, o comando abaixo concatena a lista que ja tinha antes com a nova resposta
        this.items = this.items.concat(response['content']); 
        // Fim do comando

        let end = this.items.length - 1; // Tamanho da lista depois de concatenar - 1 (varreu 10 posicoes)

        loader.dismiss(); // Fecha a tela de carregamento
        console.log(this.page);
        console.log(this.items);
        // O comando abaixo carrega as imagens dos produtos
        this.loadImageUrls(start,end);
        // Fim do comando
      },
      error => {
        loader.dismiss(); // Fecha a tela de carregamento
      });
    // Fim do comando
  }

  loadImageUrls(start: number, end: number) {
    // Esse metodo carrega a imagem do produto (produtoDTO)

    // O codigo abaixo seta a imagem de cada produto
    for (var i=start; i<= end; i++) {
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
    // O comando abaixo zera a lista e a pagina pra dar o refresh corretamnete
    this.page = 0;
    this.items = [];
    // Fim do comando

    this.loadData(); // Recarrega os dados
    setTimeout(() => {
      // Essa funcao executa alguma coisa depois daquele tempo ali embaixo, no caso "1000ms" (1s)
      refresher.complete(); // Fecha o refresher depois de 1000ms/1s
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    // Esse metodo faz infinite scroll
    // Esse metodo eh sempre chamado quando faz o puxe do infinite scroll

    this.page++; // Aumenta a page
    this.loadData(); // Recarrego os dados

    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

}