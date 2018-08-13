import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Esse NgModule eh um "decorator" e eh uma anotacao que vai ter configs para alterar a minha classe
@NgModule({
  declarations: [
    // Em declarations coloca-se uma lista de componentes ou paginas que fazem parte desse modulo
    MyApp // Pagina principail "MyApp"
  ],
  imports: [
    // Em imports temos uma lista de modulos importados por esse modulo
    BrowserModule, 
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {} // Isso aqui serve para que essa classe seja vista por outras
