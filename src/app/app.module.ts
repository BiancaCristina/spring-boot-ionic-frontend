import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HttpClientModule} from '@angular/common/http'
import { CategoriaService } from '../services/domain/categoria.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';
import { StorageServices } from '../services/storage.service';

// Esse NgModule eh um "decorator" e eh uma anotacao que vai ter configs para alterar a minha classe
@NgModule({
  declarations: [
    // Em declarations coloca-se uma lista de componentes ou paginas que fazem parte desse modulo
    MyApp // Pagina principail "MyApp"
  ],
  imports: [
    // Em imports temos uma lista de modulos importados por esse modulo
    BrowserModule, 
    HttpClientModule, // (?) Faz comunicao com o backend
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  // Em bootstrap temos a indicacao de como a aplicacao vai iniciar
  entryComponents: [
    // Em entryComponents, se em "declarations" for paginas e nao apenas componentes, entao o que estiver em "declarations" precisa estar em "entryComponents"
    MyApp
  ],
  providers: [
    // Em providers temos as declaracoes de classes as quais eu quero que os objetos injetados dessas classes sejam uma instancia unica para este modulo
    // Ou seja, sempre que eu injetar objetos dos tipos abaixo numa classe desse modulo, estarei usando a mesma instancia
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService, // Eu coloco ele no modulo principal para que ele seja instanciado uma vez para toda a aplicacao (porque acredito que ele vai ser necessario em mais de uma pagina)
    ErrorInterceptorProvider, // Interceptador de erros
    AuthService, // Autentica o user
    StorageServices // Servico de storage (armazenamento)
  ]
})
export class AppModule {} // Isso aqui serve para que essa classe seja vista por outras
