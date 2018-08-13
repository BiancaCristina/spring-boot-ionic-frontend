import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { HomePage } from './home';

@NgModule({
    // Declaracoes padroes de um modulo
    // O nome "HomePage" tem que corresponder ao nome da classe em "home.ts"
    declarations: [HomePage],
    imports: [IonicPageModule.forChild(HomePage)] 
    // Fim das declaracoes padroes de um modulo
})
export class HomeModule {}