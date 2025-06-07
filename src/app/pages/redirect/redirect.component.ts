import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  template: '' // Sin HTML porque no se muestra nada
})
export class RedirectComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      switch (user.role) {
        case 'admin':
          this.router.navigate(['/admin']);
          break;
        case 'granjero':
          this.router.navigate(['/granjero']);
          break;
        case 'medico':
          this.router.navigate(['/medico']);
          break;
        case 'encargado':
          this.router.navigate(['/encargado']);
          break;
        default:
          this.router.navigate(['/notfound']);
      }
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
