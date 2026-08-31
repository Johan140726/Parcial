import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioActual: Usuario | null = null;

  constructor() {}

  login(correo: string, clave: string): boolean {
    // Temporalmente simulamos la autenticación.
    // Más adelante este método consumirá el endpoint del backend.

    if (correo && clave) {
      this.usuarioActual = {
        nombreCompleto: 'Usuario Velvet & Blade',
        telefono: '',
        correo,
        clave: '',
        tipoPerfil: 'Cliente',
        aceptaTerminos: true
      };

      return true;
    }

    return false;
  }

  registrar(usuario: Usuario): boolean {
    // Temporalmente simulamos el registro.
    // Más adelante este método enviará los datos al backend.

    this.usuarioActual = {
      ...usuario,
      clave: ''
    };

    return true;
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  cerrarSesion(): void {
    this.usuarioActual = null;
  }

  estaAutenticado(): boolean {
    return this.usuarioActual !== null;
  }
}