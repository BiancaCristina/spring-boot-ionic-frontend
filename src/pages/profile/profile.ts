import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

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
          // Caso a resposta seja um sucesso, entao:
          this.cliente = response;
          
          // O comando abaixo busca a imagem do cliente no bucket da Amazon
          this.getImageIfExists();
          // Fim do comando
        },
        error =>{
          if (error.status == 403){
            // Se o erro for o 403, eu redireciono para a pagina home
            this.navCtrl.setRoot("HomePage");
          }

        });
    }

    else {
      // Caso de algum problema com o localUser, redireciona para a pagina home
      this.navCtrl.setRoot("HomePage");

    }
  }

  getImageIfExists() {
    // Esse metodo verifica se a imagem existe

    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      // Se a requisicao for um sucesso, seta a imagem do cliente
      this.cliente.imageURL = `${API_CONFIG.bucketBaseURL}/cp${this.cliente.id}.jpg`;
    },
    error => {});
  }

}
