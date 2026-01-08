import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    // Usamos o Observable isLoggedIn$ do nosso serviço
    return this.authService.isLoggedIn$.pipe(
      take(1), // Pega apenas o primeiro valor emitido para não deixar a inscrição ativa
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true; // Se o usuário está logado, permite o acesso
        }

        // Se não está logado, redireciona para a página de login
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
