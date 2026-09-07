import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Usuario, TipoPerfil } from '../models/usuario.model';
import { StorageService } from './storage.service';
import { environment } from '../../environments/environment';

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

  private readonly API_URL = `${environment.apiUrl}/usuarios`;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  login(correo: string, clave: string): Observable<Usuario> {
    return this.http.post<UsuarioApi>(`${this.API_URL}/login`, {
      correo,
      password: clave
    }).pipe(
      map((usuario) => this.convertirUsuario(usuario)),
      tap((usuario) => {
        // Persistimos la sesión en storage para que sobreviva recargas
        // y para que el resto de la app (citas, historial) pueda leer
        // el usuario logueado.
        this.storageService.set('usuario', usuario);
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
      map((usuarioRegistrado) => this.convertirUsuario(usuarioRegistrado))
    );
  }

  async obtenerUsuarioActual(): Promise<Usuario | null> {
    const usuario = await this.storageService.get('usuario');
    return usuario ?? null;
  }

  async cerrarSesion(): Promise<void> {
    await this.storageService.remove('usuario');
  }

  async estaAutenticado(): Promise<boolean> {
    const usuario = await this.storageService.get('usuario');
    return !!usuario;
  }

  private convertirUsuario(usuario: UsuarioApi): Usuario {
    return {
      id: usuario.id,
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
