import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface User {
  email: string;
  role: string;
}

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

  // Retorna Observable<boolean> para login
  login(email: string, password: string): Observable<boolean> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify({ email: user.email, role: user.role }));
      return of(true);
    }
    return of(false);
  }

  // Retorna usuario o null
  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) as User : null;
  }

  // Retorna rol o null
  getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  // Retorna booleano si está autenticado
  isAuthenticated(): boolean {
    return this.getUser() !== null;
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}
