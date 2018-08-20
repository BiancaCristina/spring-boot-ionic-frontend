import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { Camera, CameraOptions } from '../../../node_modules/@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  picture: string; // Guarda a foto do user

  // A variavel abaixo controla se o botao de "Tirar Foto" estara habilitado ou nao
  cameraOn: boolean = false; 
  // Fim da variavel

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public camera: Camera) {
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

  getCameraPicture() {
    // Esse metodo usa a camera do dispositivo para que o user tire foto

    this.cameraOn = true; // Liga camera

    const options: CameraOptions = {
      quality: 100, // Qualidade maxima
      destinationType: this.camera.DestinationType.DATA_URL, // Base64 = destination
      encodingType: this.camera.EncodingType.PNG, // Tipo da imagem
      mediaType: this.camera.MediaType.PICTURE // Tipo de media    
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // Then funciona de forma parecida ao "subscribe"
     // Logo, quando vier a resposta da camera e ela for um sucesso, entao:

     // O comando abaixo pega a imagem e guarda ela em formato base64
     // Base64 = formato string
     this.picture = 'data:image/png;base64,' + imageData;
     // Fim do comando

     this.cameraOn = false; // Desliga camera

    }, (err) => {});
  }

}
