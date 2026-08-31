import { Component, OnInit } from '@angular/core';
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
    private router: Router
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
      return;
    }

    const { correo, clave } = this.loginForm.value;

    const loginExitoso = this.authService.login(correo, clave);

    if (loginExitoso) {
      this.router.navigate(['/seleccion-servicio']);
    } else {
      this.errorMessage = 'Correo o contraseña incorrectos.';
    }
  }

  irARegistro(): void {
    this.router.navigate(['/registro']);
  }
}
