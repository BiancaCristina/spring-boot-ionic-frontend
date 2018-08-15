import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers: [
    CidadeService, // Fica declarado aqui  e nao no "app.module.ts" porque eu vou precisar desses servicos apenas no "signup" e nao na aplicacao inteira
    EstadoService // Fica declarado aqui  e nao no "app.module.ts" porque eu vou precisar desses servicos apenas no "signup" e nao na aplicacao inteira
  ]
})
export class SignupPageModule {}
