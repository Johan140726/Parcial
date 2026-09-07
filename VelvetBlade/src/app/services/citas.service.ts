import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { StorageService } from './storage.service';
import { Cita, NuevaCita, EstadoCita } from '../models/cita.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private apiUrl = `${environment.apiUrl}/citas`;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  async listarTodas(): Promise<Cita[]> {
    const citas = await firstValueFrom(this.http.get<Cita[]>(this.apiUrl));
    await this.storageService.set('citas_todas', citas);
    return citas;
  }

  async listarPorUsuario(usuarioId: string): Promise<Cita[]> {
    try {
      // El backend expone GET /api/citas/:usuarioId directamente,
      // sin segmento '/usuario/' intermedio.
      const citas = await firstValueFrom(
        this.http.get<Cita[]>(`${this.apiUrl}/${usuarioId}`)
      );
      await this.storageService.set(`citas_usuario_${usuarioId}`, citas);
      return citas;
    } catch (error) {
      // Fallback offline: usa lo último guardado en storage
      const citasLocal = await this.storageService.get(`citas_usuario_${usuarioId}`);
      return citasLocal ?? [];
    }
  }

  async crear(nuevaCita: NuevaCita): Promise<Cita> {
    const cita = await firstValueFrom(this.http.post<Cita>(this.apiUrl, nuevaCita));
    const citasLocal: Cita[] =
      (await this.storageService.get(`citas_usuario_${nuevaCita.usuarioId}`)) ?? [];
    citasLocal.push(cita);
    await this.storageService.set(`citas_usuario_${nuevaCita.usuarioId}`, citasLocal);
    return cita;
  }

  async cambiarEstado(id: string, estado: EstadoCita): Promise<Cita> {
    const cita = await firstValueFrom(
      this.http.patch<Cita>(`${this.apiUrl}/${id}/estado`, { estado })
    );
    const citasLocal: Cita[] = (await this.storageService.get(`citas_usuario_${cita.usuarioId}`)) ?? [];
    const idx = citasLocal.findIndex((c) => c.id === id);
    if (idx > -1) {
      citasLocal[idx] = cita;
      await this.storageService.set(`citas_usuario_${cita.usuarioId}`, citasLocal);
    }
    return cita;
  }

  async cancelar(id: string): Promise<Cita> {
    return this.cambiarEstado(id, 'cancelado');
  }

  async horariosOcupados(profesionalId: string, fecha: string): Promise<string[]> {
    const todas = await this.listarTodas();
    return todas
      .filter(
        (c) =>
          c.profesionalId === profesionalId &&
          c.fecha === fecha &&
          c.estado !== 'cancelado'
      )
      .map((c) => c.hora);
  }
}
