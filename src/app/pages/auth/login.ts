import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      ButtonModule,
      CheckboxModule,
      InputTextModule,
      PasswordModule,
      RippleModule,
      AppFloatingConfigurator
    ],
    template: `
      <app-floating-configurator />
      <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen overflow-hidden px-4">
        <div class="flex flex-col items-center justify-center w-full max-w-md">
          <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
            <div class="w-full bg-surface-0 dark:bg-surface-900 py-12 px-8 sm:px-12" style="border-radius: 53px">
              <div class="text-center mb-6">
                <div class="text-surface-900 dark:text-surface-0 text-2xl sm:text-3xl font-medium mb-4">BIENVENIDO A NUESTRA EMPRESA AVICOLA!</div>
                <span class="text-muted-color font-medium text-sm sm:text-base">INICIA SESION PARA CONTINUAR</span>
              </div>
  
              <div>
                <label for="email1" class="block text-surface-900 dark:text-surface-0 text-sm sm:text-base font-medium mb-2">CORREO ELECTRONICO</label>
                <input pInputText id="email1" type="text" placeholder="DIRECCION DE CORREO" class="w-full mb-4 p-inputtext-sm sm:p-inputtext-md" [(ngModel)]="email" />
  
                <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-sm sm:text-base mb-2">CONTRASEÑA</label>
                <p-password id="password1" [(ngModel)]="password" placeholder="CONTRASEÑA" [toggleMask]="true" styleClass="mb-4 w-full" [fluid]="true" [feedback]="false"></p-password>
  
                <div class="flex items-center justify-between mt-2 mb-4 gap-4">
                  <div class="flex items-center">
                    <p-checkbox [(ngModel)]="checked" id="rememberme1" binary class="mr-2 text-sm sm:text-base"></p-checkbox>
                    <label for="rememberme1" class="text-sm sm:text-base">RECORDARME</label>
                  </div>
                  <span class="font-medium text-sm sm:text-base cursor-pointer text-primary">¿OLVIDASTE TU CONTRASEÑA?</span>
                </div>
                <p-button label="INICIAR SESION" styleClass="w-full" (onClick)="onLogin()"></p-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
})
export class Login {
  email: string = '';
  password: string = '';
  checked: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.email, this.password).subscribe(success => {
      if (success) {
        const role = this.auth.getUserRole();
        switch (role) {
          case 'admin':
            this.router.navigate(['/admin']);
            break;
          case 'medico':
            this.router.navigate(['/dashboard']);
            break;
          case 'granjero':
            this.router.navigate(['/dashboard']);
            break;
          case 'encargado':
            this.router.navigate(['/dashboard']);
            break;
          default:
            this.router.navigate(['/']);
        }
      } else {
        alert('Credenciales inválidas');
      }
    });
  }
}