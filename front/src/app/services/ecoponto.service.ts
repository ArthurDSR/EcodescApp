import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ecoponto } from '../model/ecoponto';


@Injectable({
  providedIn: 'root'
})
export class EcopontoService {

  url: string = 'http://localhost:8080/api/v1/ecoponto';
  constructor(private httpClient: HttpClient) { }

  salvar(ecoponto: Ecoponto): Observable<void> {
    return this.httpClient.post<void>(this.url, ecoponto );
  }

  atualizar(ecoponto: Ecoponto): Observable<void> {
    return this.httpClient.put<void>(this.url, ecoponto );
  }

  excluir(id: number): Observable<void> {
    let urlAuxiliar = this.url + "/" + id;
    return this.httpClient.delete<void>(urlAuxiliar);
  }

  buscarPorId(id: number): Observable<Ecoponto> {
    let urlAuxiliar = this.url + "/" + id;
    return this.httpClient.get<Ecoponto>(urlAuxiliar, this.getHttpOptions());
  }

  listarTodos(): Observable<Ecoponto[]> {
    let urlAuxiliar = this.url;
    return this.httpClient.get<Ecoponto[]>(this.url, this.getHttpOptions());
  }

  private getHttpOptions() {

    return {
      headers: new HttpHeaders({

      })
    };
  }
}
