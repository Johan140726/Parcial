import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TipoPerfil, Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage implements OnInit {

  registroForm!: FormGroup;
  submitted = false;
  errorMessage = '';

  tiposPerfil: TipoPerfil[] = ['Cliente', 'Especialista'];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombreCompleto: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],

      telefono: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{7,10}$/)
      ]],

      correo: ['', [
        Validators.required,
        Validators.email
      ]],

      clave: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],

      confirmarClave: ['', [
        Validators.required
      ]],

      tipoPerfil: ['Cliente', [
        Validators.required
      ]],

      aceptaTerminos: [false, [
        Validators.requiredTrue
      ]]
    });
  }

  get nombreCompleto() {
    return this.registroForm.get('nombreCompleto');
  }

  get telefono() {
    return this.registroForm.get('telefono');
  }

  get correo() {
    return this.registroForm.get('correo');
  }

  get clave() {
    return this.registroForm.get('clave');
  }

  get confirmarClave() {
    return this.registroForm.get('confirmarClave');
  }

  get tipoPerfil() {
    return this.registroForm.get('tipoPerfil');
  }

  get aceptaTerminos() {
    return this.registroForm.get('aceptaTerminos');
  }

  clavesCoinciden(): boolean {
    return this.clave?.value === this.confirmarClave?.value;
  }

  registrarUsuario(): void {
  this.submitted = true;
  this.errorMessage = '';

  if (this.registroForm.invalid || !this.clavesCoinciden()) {
    this.registroForm.markAllAsTouched();
    return;
  }

  const usuario: Usuario = {
    nombreCompleto: this.registroForm.value.nombreCompleto,
    telefono: this.registroForm.value.telefono,
    correo: this.registroForm.value.correo,
    clave: this.registroForm.value.clave,
    tipoPerfil: this.registroForm.value.tipoPerfil,
    aceptaTerminos: this.registroForm.value.aceptaTerminos
  };

  this.authService.registrar(usuario).subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: (error) => {
      if (error.status === 409) {
        this.errorMessage = 'El correo ya está registrado.';
      } else if (error.status === 400) {
        this.errorMessage = error.error?.error || 'Todos los campos son obligatorios.';
      } else {
        this.errorMessage = 'No fue posible crear la cuenta. Verifica que el servidor esté funcionando.';
      }
    }
  });
}

  irALogin(): void {
    this.router.navigate(['/login']);
  }
}
