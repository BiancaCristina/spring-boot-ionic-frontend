import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findByCategoria(categoria_id : string) {
    return this.http.get(`${API_CONFIG.baseURL}/produtos/?categorias=${categoria_id}`);
  }

  getSmallImageFromBucket(id : string) : Observable<any> {
    // Esse metodo pega a imagem "small" e coloca no produto
    let url = `${API_CONFIG.bucketBaseURL}/prod${id}-small.jpg`
    
    return this.http.get(url, {responseType : 'blob'});
  }
}