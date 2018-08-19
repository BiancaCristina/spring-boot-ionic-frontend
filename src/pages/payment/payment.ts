import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: PedidoDTO; // Pega o Pedido
  parcelas: number[] = [1,2,3,4,5,6,7,8,9,10]; // Lista de opcoes de quantidade de parcelas
  formGroup: FormGroup; // Formulario da tela de pagamento 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
      // O comando abaixo pega o objeto pedido que veio da outra pagina
      this.pedido = this.navParams.get("pedido");
      // Fim do comando
      
      // Esse comando constroi o formGroup usando o formBuilder
      this.formGroup = this.formBuilder.group( {
        numeroDeParcelas: [1, Validators.required], // 1 eh o valor padrao de parcelas (minimo) e esse campo eh obrigatorio
        "@type": ["pagamentoComCartao", Validators.required] // O nome "pagamentoComCartao "precisa ser igual ao nome do backend (valor padrao)
      });
      // Fim do comando
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value; // Preenche os dados de pagamento com os dados do form
    
    // O comando abaixo faz o redirecionamento pra proxima pagina referente a finalizacao do pedido e passa o pedido como parametro de navegacao
    // Nao se usa "push" aqui pra manter a consistencia da API, ou seja,
    // Se tivesse "push" aqui, haveria um botao de "voltar" e, no caso, eu ja teria confirmado o pedido -> inconsistencia
    this.navCtrl.setRoot("OrderConfirmationPage", {pedido: this.pedido}); // Redireciona pra pagina de confirmacao de pedido 
    // Fim do comando
    
  }

}
