import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

// Esse arquivo eh o controlador da pagina "app.html"
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // O rootPage diz quem eh a pagina inicial do meu aplicativo
  rootPage: string = "HomePage";

  // O comando abaixo define uma colecao de objetos com os elementos titulo e componente
  pages: Array<{title: string, component: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public authService: AuthService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // O comando abaixo define uma lista 
    this.pages = [ 
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Categorias', component: 'CategoriasPage'},
      { title: 'Logout', component: ''} // O Logout possui um tratamento especial, uma vez que nao possu component
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: {title: string, component: string}) {
    // Esse metodo eh responsavel por fazer o tratamento especial do botao "logout"
    switch(page.title){
      case 'Logout': 
        this.authService.logout(); // Chama o metodo logout do AuthService
        this.nav.setRoot("HomePage"); // Redireciona pra pagina inicial
      break;

      default:
        this.nav.setRoot(page.component);
    }
    
  }
}
