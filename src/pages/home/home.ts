import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from '../../../node_modules/ionic-angular/navigation/ionic-page';

// Esse arquivo eh o controlador da view "home.html" (o que faz isso eh a anotacao @Component)
@IonicPage() // Essa anotacao faz com que eu possa referenciar essa classe usando o nome da classe entre aspas, ex: "HomePage", o que facilita no Lazy Loading
@Component({
  selector: 'page-home',
  templateUrl: 'home.html' // Faz referencia a qual arquivo .html que esse arquivo controla
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    // Esse navCtrl eh injetado como uma dependencia 
  }

  login(){
    // Metodo para realizar login

    // O comando abaixo abre a pagina de categoria
      // Se eu usasse "push", o comando abriria Categoria e colocaria a setinha para voltar!
    this.navCtrl.setRoot("CategoriasPage"); // Esse setRoot abre a page de Categorias
    // Fim do comando
  }

}
