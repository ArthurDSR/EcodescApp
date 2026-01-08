import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const userRole = this.authService.getUserRole();
    
    if (userRole === 'ADMIN') {
      return true;
    }
    
    console.warn('Acesso negado: apenas administradores podem acessar esta página');
    this.router.navigate(['/tabs/home']);
    return false;
  }
}
