import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Novidade } from '../model/novidade';


@Injectable({
  providedIn: 'root'
})
export class NovidadeService {

  url: string = 'http://localhost:8080/api/v1/novidade';
  constructor(private httpClient: HttpClient) { }

  salvarComImagem(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.url}`, formData); // envia multipart/form-data
  }

  atualizarComImagem(id: number, formData: FormData): Observable<any> {
    return this.httpClient.put(`${this.url}/${id}`, formData); // idem
  }

  excluir(id: number): Observable<void> {
    let urlAuxiliar = this.url + "/" + id;
    return this.httpClient.delete<void>(urlAuxiliar, this.getHttpOptions());
  }

  buscarPorId(id: number): Observable<Novidade> {
    let urlAuxiliar = this.url + "/" + id;
    return this.httpClient.get<Novidade>(urlAuxiliar, this.getHttpOptions());
  }

  listarTodos(): Observable<Novidade[]> {
    let urlAuxiliar = this.url;
    return this.httpClient.get<Novidade[]>(this.url, this.getHttpOptions());
  }

  private getHttpOptions() {

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
