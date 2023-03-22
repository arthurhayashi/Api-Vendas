import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import Product from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURL : string = 'http://localhost:3333';

  constructor(private http : HttpClient) { }

  listarTodosProdutos() {
   return this.http.get<Product[]>(`${ this.apiURL }/products`);
  }

  listarTodosProdutoPorId(id: string) {
    return this.http.get<Product>(`${ this.apiURL }/products/${id}`);
   }

  adicionarProduto(product : Product) {
   return this.http.post(`${ this.apiURL }/products`, product);
  }

  editarProduto(id: string, product: Product){
    return this.http.put(`${ this.apiURL }/products/${id}`, product);
  }

  excluirProduto(id: string){
    return this.http.delete(`${ this.apiURL }/products/${id}`);
  }
}
