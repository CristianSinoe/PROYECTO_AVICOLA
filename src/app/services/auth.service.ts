import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private user: any = null;

    constructor(private http: HttpClient, private router: Router) {}

    login(email: string, password: string): Observable<boolean> {
        return this.http.get<any>('/assets/data.json').pipe(
            map(data => {
                const user = data.usuarios.find((u: any) => u.email === email && u.password === password);
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.user = user;
                    return true;
                }
                return false;
            })
        );
    }

    getUser(): any {
        if (!this.user) {
            const saved = localStorage.getItem('user');
            this.user = saved ? JSON.parse(saved) : null;
        }
        return this.user;
    }

    getUserRole(): string {
        return this.getUser()?.role;
    }

    isAuthenticated(): boolean {
        return !!this.getUser();
    }

    hasRole(roles: string[]): boolean {
        const role = this.getUserRole();
        return roles.includes(role);
    }

    logout(): void {
        localStorage.removeItem('user');
        this.user = null;
        this.router.navigate(['/auth/login']);
    }
}
