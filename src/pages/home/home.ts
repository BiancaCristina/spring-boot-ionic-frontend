import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { IonicPage } from '../../../node_modules/ionic-angular/navigation/ionic-page';
import { CredenciaisDTO } from '../../models/credenciais.dto';

// Esse arquivo eh o controlador da view "home.html" (o que faz isso eh a anotacao @Component)
@IonicPage() // Essa anotacao faz com que eu possa referenciar essa classe usando o nome da classe entre aspas, ex: "HomePage", o que facilita no Lazy Loading
@Component({
  selector: 'page-home',
  templateUrl: 'home.html' // Faz referencia a qual arquivo .html que esse arquivo controla
})
export class HomePage {

  creds: CredenciaisDTO = {
    // Cria um tipo CredenciaisDTO com os atributos vazios
    email: "",
    senha: ""
  };
  
  constructor(public navCtrl: NavController, public menu: MenuController) {
    // Esse navCtrl eh injetado como uma dependencia 
  }

  ionViewWillEnter() {
    // Nesse metodo, quando estiver na pagina de login, o menu sera desabilitado
    this.menu.swipeEnable(false);
    }

    ionViewDidLeave() {
      // Nesse metodo, quando sair da pagina de login, o menu sera habilitado
    this.menu.swipeEnable(true);
    }

  login(){
    // Metodo para realizar login

    // Imprime o valor da variavel creds no console
    console.log(this.creds);
    // Fim da impressao

    // O comando abaixo abre a pagina de categoria
      // Se eu usasse "push", o comando abriria Categoria e colocaria a setinha para voltar!
    this.navCtrl.setRoot("CategoriasPage"); // Esse setRoot abre a page de Categorias
    // Fim do comando
  }

}
