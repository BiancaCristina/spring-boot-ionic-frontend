import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

// Essa classe intercepta erros de authorization
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {     
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Esse metodo intercepta uma requisica e executa os comandos de tratamento
        // Alem disso, esse metodo sera responsavel por incluir o token nas requisicoes
        
        let localUser = this.storage.getLocalUser(); // Pega o local user
        let N = API_CONFIG.baseURL.length; // Pega o tamanho da string da baseURL
        
        // O comando abaixo testa se a requisicao eh da API
        let requestToAPI = req.url.substring(0,N) == API_CONFIG.baseURL; // Compara se os primeiros caracteres da URL da requisicao == URL do baseURL
        // Fim do comando

        if (localUser && requestToAPI){
            // Caso exista token no localStorage e seja uma requisicao da API (baseURL)
            // Isso significa que, por exemplo, caso seja uma requisicao do bucket S3, o header nao sera incluso!

            // O comando abaixo clona a requisicao e acrescenta o Header Authorization
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            // Fim do comando

            return next.handle(authReq);
        }
       
        else {
            // Caso nao exista
            return next.handle(req); // Propaga a requisicao original
        }     
    }
}

export const AuthInterceptorProvider = {
    // Esse cons eh uma exigencia do framework pra criar um interceptor
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};