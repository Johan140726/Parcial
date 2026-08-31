import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Usuario, TipoPerfil } from '../models/usuario.model';

interface UsuarioApi {
  id: string;
  nombre: string;
  telefono: string;
  correo: string;
  tipo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:3000/api/usuarios';

  private usuarioActual: Usuario | null = null;

  constructor(private http: HttpClient) {}

  login(correo: string, clave: string): Observable<Usuario> {
    return this.http.post<UsuarioApi>(`${this.API_URL}/login`, {
      correo,
      password: clave
    }).pipe(
      map((usuario) => this.convertirUsuario(usuario)),
      tap((usuario) => {
        this.usuarioActual = usuario;
      })
    );
  }

  registrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<UsuarioApi>(this.API_URL, {
      nombre: usuario.nombreCompleto,
      telefono: usuario.telefono,
      correo: usuario.correo,
      password: usuario.clave,
      tipo: usuario.tipoPerfil.toLowerCase()
    }).pipe(
      map((usuarioRegistrado) => ({
        id: Number(usuarioRegistrado.id.replace(/\D/g, '')) || undefined,
        nombreCompleto: usuarioRegistrado.nombre,
        telefono: usuarioRegistrado.telefono,
        correo: usuarioRegistrado.correo,
        clave: '',
        tipoPerfil: this.convertirTipoPerfil(usuarioRegistrado.tipo),
        aceptaTerminos: usuario.aceptaTerminos
      })),
      tap((usuarioRegistrado) => {
        this.usuarioActual = usuarioRegistrado;
      })
    );
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

  private convertirUsuario(usuario: UsuarioApi): Usuario {
    return {
      id: Number(usuario.id.replace(/\D/g, '')) || undefined,
      nombreCompleto: usuario.nombre,
      telefono: usuario.telefono,
      correo: usuario.correo,
      clave: '',
      tipoPerfil: this.convertirTipoPerfil(usuario.tipo),
      aceptaTerminos: true
    };
  }

  private convertirTipoPerfil(tipo: string): TipoPerfil {
    return tipo.toLowerCase() === 'especialista'
      ? 'Especialista'
      : 'Cliente';
  }
}