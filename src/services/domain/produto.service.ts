import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findByCategoria(categoria_id : string) {
    return this.http.get(`${API_CONFIG.baseURL}/produtos/?categorias=${categoria_id}`);
  }

  findById(produto_id : string) {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseURL}/produtos/${produto_id}`);
  }
  
  getSmallImageFromBucket(id : string) : Observable<any> {
    // Esse metodo pega a imagem "small" do bucket e coloca no produto
    let url = `${API_CONFIG.bucketBaseURL}/prod${id}-small.jpg`

    return this.http.get(url, {responseType : 'blob'});
  }

  getImageFromBucket(id : string) : Observable<any> {
    // Esse metodo pega a imagem "normal" do bucket e coloca no produto-detail
    let url = `${API_CONFIG.bucketBaseURL}/prod${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
  }  
  
}