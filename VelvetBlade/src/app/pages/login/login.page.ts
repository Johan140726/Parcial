import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
  private formBuilder: FormBuilder,
  private authService: AuthService,
  private router: Router,
  private changeDetectorRef: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      correo: ['', [
        Validators.required,
        Validators.email
      ]],
      clave: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  get correo() {
    return this.loginForm.get('correo');
  }

  get clave() {
    return this.loginForm.get('clave');
  }

iniciarSesion(): void {
  this.submitted = true;
  this.errorMessage = '';

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    this.changeDetectorRef.detectChanges();
    return;
  }

  const correo = this.loginForm.get('correo')?.value;
  const clave = this.loginForm.get('clave')?.value;

  this.authService.login(correo, clave).subscribe({
    next: (usuario) => {
      console.log('Login exitoso:', usuario);
      this.router.navigate(['/seleccion-servicio']);
    },
    error: (error) => {
      console.log('Error de login:', error);

      if (error.status === 401) {
        this.errorMessage = 'Correo o contraseña incorrectos.';
      } else {
        this.errorMessage = 'No se pudo conectar con el servidor.';
      }

      this.changeDetectorRef.detectChanges();
    }
  });
}

  irARegistro(): void {
    this.router.navigate(['/registro']);
  }
}