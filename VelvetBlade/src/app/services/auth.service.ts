import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Observable, from } from 'rxjs';
import { Usuario, TipoPerfil } from '../models/usuario.model';

const CLAVE_USUARIOS = 'vb_usuarios';
const CLAVE_SESION = 'vb_usuario_actual';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioActual: Usuario | null = null;

  constructor() {
    // Al crear el servicio, intentamos recuperar la sesión guardada
    // (esto es async, así que "usuarioActual" queda listo poco después,
    // no en el mismo instante en que arranca la app).
    this.cargarSesionGuardada();
  }

  private async cargarSesionGuardada(): Promise<void> {
    const { value } = await Preferences.get({ key: CLAVE_SESION });
    this.usuarioActual = value ? (JSON.parse(value) as Usuario) : null;
  }

  private async obtenerUsuarios(): Promise<Usuario[]> {
    const { value } = await Preferences.get({ key: CLAVE_USUARIOS });
    return value ? (JSON.parse(value) as Usuario[]) : [];
  }

  private async guardarUsuarios(usuarios: Usuario[]): Promise<void> {
    await Preferences.set({ key: CLAVE_USUARIOS, value: JSON.stringify(usuarios) });
  }

  private async guardarSesion(usuario: Usuario): Promise<void> {
    await Preferences.set({ key: CLAVE_SESION, value: JSON.stringify(usuario) });
    this.usuarioActual = usuario;
  }

  login(correo: string, clave: string): Observable<Usuario> {
    return from(this.loginAsync(correo, clave));
  }

  private async loginAsync(correo: string, clave: string): Promise<Usuario> {
    const usuarios = await this.obtenerUsuarios();
    const encontrado = usuarios.find((u) => u.correo === correo && u.clave === clave);

    if (!encontrado) {
      throw new Error('Correo o contraseña incorrectos');
    }

    await this.guardarSesion(encontrado);
    return encontrado;
  }

  registrar(usuario: Usuario): Observable<Usuario> {
    return from(this.registrarAsync(usuario));
  }

  private async registrarAsync(usuario: Usuario): Promise<Usuario> {
    const usuarios = await this.obtenerUsuarios();

    const yaExiste = usuarios.some((u) => u.correo === usuario.correo);
    if (yaExiste) {
      throw new Error('El correo ya está registrado');
    }

    const nuevoUsuario: Usuario = {
      ...usuario,
      id: Date.now(),
    };

    usuarios.push(nuevoUsuario);
    await this.guardarUsuarios(usuarios);
    await this.guardarSesion(nuevoUsuario);

    return nuevoUsuario;
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  cerrarSesion(): void {
    Preferences.remove({ key: CLAVE_SESION });
    this.usuarioActual = null;
  }

  estaAutenticado(): boolean {
    return this.usuarioActual !== null;
  }

  private convertirTipoPerfil(tipo: string): TipoPerfil {
    return tipo.toLowerCase() === 'especialista' ? 'Especialista' : 'Cliente';
  }
}