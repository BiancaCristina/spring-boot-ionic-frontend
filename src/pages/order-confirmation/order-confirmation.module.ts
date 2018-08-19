import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderConfirmationPage } from './order-confirmation';
import { PedidoService } from '../../services/domain/pedido.service';

@NgModule({
  declarations: [
    OrderConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderConfirmationPage)
  ],
  providers: [
    PedidoService // Como ta so no order, esse servico so existe no order e nao globalmente
  ]
})
export class OrderConfirmationPageModule {}
