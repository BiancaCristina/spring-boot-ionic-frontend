import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  
  // A variavel abaixo corresponde a uma lista de CategoriaDTO
  // O nome "items", quando eu for usar no categorias.html tem que ser igual ao do for "let item of items"
  items: CategoriaDTO[]; 
  // Fim da variavel

  // A variavel abaixo eh uma string que recebe a string "bucketBaseURL" do api.config.ts
  bucketURL: string = API_CONFIG.bucketBaseURL;
  // Fim da variavel
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService ) {
  }



  ionViewDidLoad() {
    // Quando a pagina acabar de ser carregada, o que estiver nesse metodo sera executado
    // Eu preciso usar o "subscribe" porque eh uma chamada assincrona, logo eu preciso me "inscrever" pra fazer alguma coisa quando a resposta chegar
    this.categoriaService.findAll().subscribe(response => {
      // Esse comando que eu fiz "response => {corpo da funcao}" eh uma funcao anonima (arrow function) que pode substituir uma funcao callback
      // Uma funcao callback eh tipicamente passada como argumento de outra funcao e/ou chamada quando um evento acontecer ou quando uma parte do codigo receber uma resposta que estava esperando
      
      // O comando abaixo faz com que o html leia a lista de CategoriaDTO (items)
      this.items = response;
      // Fim do comando
  
      // Essa funcao aqui dentro ({corpo da funcao}) so sera executada quando a resposta da requisicao for um sucesso
    },

    error => {
      // Caso a requisicao de erro
      console.log(error); // Imprime a resposta (erro)
    });
    
    console.log();


  }

}
