// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { of } from 'rxjs'; // Necesario para crear un Observable

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'medico@example.com', password: 'medico123', role: 'medico' },
    { email: 'granjero@example.com', password: 'granjero123', role: 'granjero' },
    { email: 'encargado@example.com', password: 'encargado123', role: 'encargado' }
  ];

  constructor() {}

  // Retorna un Observable para el login
  login(email: string, password: string) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify({ email: user.email, role: user.role }));
      return of(true); // Retorna un Observable con true si el login es exitoso
    }
    return of(false); // Retorna un Observable con false si el login falla
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserRole() {
    const user = this.getUser();
    return user ? user.role : null;
  }

  logout() {
    localStorage.removeItem('user');
  }
}
