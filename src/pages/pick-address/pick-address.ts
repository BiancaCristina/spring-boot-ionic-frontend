import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[]; // Lista de enderecos do cliente

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser(); // Pega o localUser

    if (localUser && localUser.email) {
      // Se esse localUser nao for nulo e possuir o campo email, entao
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos']; // Povoa a lista de enderecos com os enderecos que vieram no response
        },
        error => {
          if (error.status == 403) {
            // Caso de o erro 403 (acesso negado), redireciona pra pagina home
            this.navCtrl.setRoot('HomePage'); // Redireciona pra pagina home
          }
        });
    }

    else {
      // Caso de algum problema com o localUser, redireciona para a pagina home
      this.navCtrl.setRoot('HomePage'); // Redireciona pra pagina home
    }
  }

}
