import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Avaliacao } from '../model/avaliacao';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  private apiUrl = 'http://localhost:8080/api/v1/avaliacao';

  constructor(private http: HttpClient) { }

  enviarAvaliacao(avaliacao: Avaliacao): Observable<any> {
    // Remova o getHttpOptions() para não sobrescrever os headers do interceptor
    return this.http.post(`${this.apiUrl}`, avaliacao);
  }

  buscarAvaliacoes(): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${this.apiUrl}`);
  }

  buscarAvaliacaoPorId(id: number): Observable<Avaliacao> {
    return this.http.get<Avaliacao>(`${this.apiUrl}/${id}`);
  }

  listarAvaliacoesPorEmpresa(idEmpresa: number): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${this.apiUrl}/empresa/${idEmpresa}`);
  }

  excluirAvaliacao(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}