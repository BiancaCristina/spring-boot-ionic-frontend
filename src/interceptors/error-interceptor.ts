import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { AlertController } from '../../node_modules/ionic-angular';
import { FieldMessage } from '../models/fieldmessage';

// Essa classe intercepta erros 
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public storage: StorageService,
        public alertCtrl: AlertController){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Esse metodo intercepta uma requisica e executa os comandos de tratamento
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;

            if (errorObj.error) {
                // Verifica se errorObj possui campo "error", se possuir, ele faz com que objError seja apenas o ERROR (devolve apenas o campo error)
                errorObj = errorObj.error;
            }
            
            if (!errorObj.status) {
                // Caso o errorObj nao tenha o campo status, eh porque nao veio como JSON e sim como texto
                // Logo, converte esse errorObj em um formato JSON
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj); // Imprime o erro

            // Tratamento especifico para o erro 403
            switch(errorObj.status){
                case 401:
                    this.handle401();
                break;

                case 403: 
                    this.handle403();
                break;

                case 422:
                    this.handle422(errorObj);
                break;

                default:
                    // Caso nao seja erro 401 e nem 403
                    this.handlerDefaultError(errorObj);
                break;
            }
            // Fim do tratamento

            return Observable.throw(errorObj); // Propaga o erro
        }) as any;
    }

    handle403() {
        // Esse metodo trata o 401: Acesso negado
        // O tratamento eh forcar a limpeza do meu localStorage
        
        // O comando abaixo limpa o localStorage
        this.storage.setLocalUser(null);
        // Fim do comando

    }

    handle401() {
        // Esse meotodo trata o erro 401: erro de autenticacao

        // O codigo abaixo cria um "alert"
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha de autenticacao',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false, // Isso faz com que a unica maneira de sair do alert seja apertando no botao (opcional)
            
            // Lista de botoes
            buttons: [
                {
                    text: 'Ok'
                }
            ]
            // Fim da lista de botoes
        });

        alert.present(); // Apresenta o alert

        // Fim do codigo
    }

    handle422(errorObj) {
        // Esse metodo trata o erro 422: erro de validacao
        let alert = this.alertCtrl.create({
            title: "Erro 422: Validacao",
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false, // Isso faz com que a unica maneira de sair do alert seja apertando no botao (opcional)
            
            // Lista de botoes
            buttons: [
                {
                    text: 'Ok'
                }
            ]
            // Fim da lista de botoes
        });

        alert.present(); // Apresenta o alert

    }

    handlerDefaultError(errorObj) {
        // Esse meotodo trata os erros defaults
        // O codigo abaixo cria um "alert"
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ' : ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false, // Isso faz com que a unica maneira de sair do alert seja apertando no botao (opcional)
            
            // Lista de botoes
            buttons: [
                {
                    text: 'Ok'
                }
            ]
            // Fim da lista de botoes
        });

        alert.present(); // Apresenta o alert

        // Fim do codigo
    }

    private listErrors(messages : FieldMessage[]) : string {
        // Esse metodo lista os erros, retornando-os em forma de string

        let s : string = ''; // Inicialmente a string eh vazia

        for (var i=0; i<messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }
        return s;
    }
}


export const ErrorInterceptorProvider = {
    // Esse cons eh uma exigencia do framework pra criar um interceptor
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};