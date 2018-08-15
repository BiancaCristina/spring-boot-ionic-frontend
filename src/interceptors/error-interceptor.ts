import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

// Essa classe intercepta erros 
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

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

            return Observable.throw(errorObj); // Propaga o erro
        }) as any;
    }
}

export const ErrorInterceptorProvider = {
    // Esse cons eh uma exigencia do framework pra criar um interceptor
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};