import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '../../../node_modules/@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  // A variavel abaixo facilita o gerenciamento dos formularios
  formGroup: FormGroup;
  // Fim da variavel

  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService) {

      // O formBuilder eh utilizado para instanciar um objeto do tipo FormGroup
      
      // O comando abaixo instancia o formGroup
      this.formGroup = this.formBuilder.group({
        // Dentro desse codigo, devo colocar todos os atributos presentes no formulario
        // Validators sao validacoes basicas do framework (as que nao precisam acessar o BD)
        nome: ["Joaquim", [Validators.required,Validators.minLength(5),Validators.maxLength(120)]], // Esses valores correspondem aos valores iniciais -> string vazia (Joaquim ta ali so pra teste), lista de validators
        email: ["joaquim@gmail.com",[Validators.required, Validators.email]],
        tipo : ['1', [Validators.required]],
        cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]], // Essa validacao do CNPJ/CPF eh basica, a validacao real do CPF/CNPJ eh feita pelo backend
        senha : ['123', [Validators.required]],
        logradouro : ['Rua Via', [Validators.required]],
        numero : ['25', [Validators.required]],
        complemento : ['Apto 3', []],
        bairro : ['Copacabana', []],
        cep : ['10828333', [Validators.required]],
        telefone1 : ['977261827', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]]
      });
      // Fim do comando
  }

  ionViewDidLoad() {
    // Esse metodo povoa a colecao "estados"

    this.estadoService.findAll()
      .subscribe(response => {
        // O comando abaixo povoa a colecao "estados"
        this.estados = response;
        // Fim do comando

        // O comando abaixo pega o primeiro elemento da lista [estados] e coloca na lista estadoID do user no form
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        // Fim do comando

        this.updateCidades(); // Busca as cidades que correspondem ao estado selecionado
      },
      error => {});     
  }

  updateCidades() {
    //

    // O comando abaixo pega o ID do estado selecionado no form
    let estado_id = this.formGroup.value.estadoId;
    // Fim do comando

    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
          // O comando abaixo povoa a colecao "cidades" com as cidades do estado passado como argumento
          this.cidades = response;
          // Fim do comando

          // O comando abaixo deseleciona a cidade que estava selecionada como padrao no form
          this.formGroup.controls.cidadeId.setValue(null);
          // Fim do comando
      },
      error => {});
  }
  signupUser() {
    console.log("enviou o form");
  }
}
