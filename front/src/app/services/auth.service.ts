import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$: Observable<boolean> = this.loggedIn$.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /* ==========================
     🔐 TOKEN
     ========================== */

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /* ==========================
     👤 USER INFO (JWT)
     ========================== */

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.role || null;
    } catch (e) {
      console.error('Token inválido:', e);
      this.logout();
      return null;
    }
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.sub || decoded.userId || decoded.id || null;
    } catch (e) {
      console.error('Erro ao decodificar token:', e);
      return null;
    }
  }

  /* ==========================
     🔑 AUTH
     ========================== */

  login(credentials: { login: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.loggedIn$.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  /* ==========================
     📝 REGISTER
     ========================== */

  register(data: { nome: string; login: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  registerEmpresa(formData: FormData) {
    return this.http.post(`${this.apiUrl}/register-business`, formData);
  }

  /* ==========================
     ✅ CHECK
     ========================== */

  checkAuth() {
    return this.http.get(`${this.apiUrl}/me`);
  }
}
