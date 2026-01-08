import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para tipar a resposta que esperamos da API
export interface ArticleSummary {
  title: string;
  link: string;
  snippet: string;
  summary: string;
}

@Injectable({
  providedIn: 'root'
})
export class SerpApiService {

  private apiUrl = 'http://localhost:8080/api/v1/search'; // URL do seu backend

  constructor(private http: HttpClient) { }

  /**
   * Busca artigos na sua API backend.
   * @param query O termo de busca.
   */
  search(query: string): Observable<ArticleSummary[]> {
    const token = localStorage.getItem('bearer_token'); // Pega o token do localStorage

    if (!token) {
      // Se não houver token, retorna um observable com erro ou vazio.
      // Idealmente, o usuário não deveria chegar aqui se a página for protegida.
      return new Observable(observer => {
        observer.error('Token de autenticação não encontrado.');
      });
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('q', query);
    
    return this.http.get<ArticleSummary[]>(this.apiUrl, { headers, params });
  }
}
