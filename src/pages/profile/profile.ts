import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser(); // Pega o localUser

    if (localUser && localUser.email){
      // Se esse localUser nao for nulo e possuir o campo email, entao
      this.email = localUser.email;
    }
  }

}
