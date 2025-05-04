import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // Verifica si el usuario está autenticado
        const user = this.authService.getUser(); // Asegúrate de que esta función devuelva el usuario autenticado

        if (user) {
            return true; // Permite el acceso si el usuario está autenticado
        }

        // Si no está autenticado, redirige al login
        this.router.navigate(['/auth/login']);
        return false;
    }
}

