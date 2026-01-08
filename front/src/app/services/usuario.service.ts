import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { Empresa } from '../model/empresa';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // URL base da sua API de usuário
  private apiUrl = 'http://localhost:8080/api/v1/usuario';

  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    const token = localStorage.getItem('bearer_token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  /**
   * Busca os dados do usuário autenticado.
   */
  getMyData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`, this.getHttpOptions());
  }

  /**
   * Atualiza o nome do usuário autenticado.
   */
  updateProfile(data: { nome: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/me/update-profile`, data);
  }

  /**
   * Altera a senha do usuário autenticado.
   */
  changePassword(data: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/me/change-password`, data);
  }

  /**
   * Lista todos os usuários (admin apenas)
   */
  listarEmpresas(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/empresas`, this.getHttpOptions());
  }

  listarUsuariosComuns(): Observable<Usuario[]> {
    
    return this.http.get<Usuario[]>(`${this.apiUrl}/comuns`, this.getHttpOptions());
  }

  listarEmpresasSituacao(): Observable<Empresa[]> {
    let api = "http://localhost:8080/api/v1/empresa"
    return this.http.get<Empresa[]>(`${api}`, this.getHttpOptions());
  }
  
  /**
   * Aprova uma empresa pendente
   */
  aprovarEmpresa(empresaId: string): Observable<any> {
    const api = "http://localhost:8080/api/v1/empresa";
    return this.http.put<any>(`${api}/${empresaId}/approve`, {}, this.getHttpOptions());
  }

  /**
   * Promove um usuário comum a admin
   */
  promoverParaAdmin(usuarioId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${usuarioId}/promover`, {}, this.getHttpOptions());
  }

   promover(usuarioId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${usuarioId}/approve`, {}, this.getHttpOptions());
  }

  rejeitar(usuarioId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${usuarioId}/reject`, {}, this.getHttpOptions());
  }
}
