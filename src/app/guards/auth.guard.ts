import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  const user = this.authService.getUser();
  console.log('AuthGuard - Usuario:', user);
  if (!user) {
    this.router.navigate(['/auth/login']);
    return false;
  }

  const allowedRoles = route.data['roles'] as string[] | undefined;
  console.log('AuthGuard - Roles permitidos:', allowedRoles);
  if (allowedRoles && allowedRoles.length > 0) {
    if (allowedRoles.includes(user.role)) {
      return true;
    } else {
      this.router.navigate(['/notfound']);
      return false;
    }
  }

  return true;
}
}
