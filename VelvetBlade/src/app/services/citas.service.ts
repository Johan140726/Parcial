import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Observable, from } from 'rxjs';
import { Cita, EstadoCita } from '../models/cita.model';

const CLAVE_CITAS = 'vb_citas';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private async obtenerTodas(): Promise<Cita[]> {
    const { value } = await Preferences.get({ key: CLAVE_CITAS });
    return value ? (JSON.parse(value) as Cita[]) : [];
  }

  private async guardarTodas(citas: Cita[]): Promise<void> {
    await Preferences.set({ key: CLAVE_CITAS, value: JSON.stringify(citas) });
  }

  listar(): Observable<Cita[]> {
    return from(this.obtenerTodas());
  }

  listarPorUsuario(usuarioId: number): Observable<Cita[]> {
    return from(
      this.obtenerTodas().then((citas) => citas.filter((c) => c.usuarioId === usuarioId))
    );
  }

  listarHorariosOcupados(profesionalId: string, fecha: string): Observable<string[]> {
    return from(
      this.obtenerTodas().then((citas) =>
        citas
          .filter(
            (c) =>
              c.profesionalId === profesionalId &&
              c.fecha === fecha &&
              c.estado !== 'Cancelado'
          )
          .map((c) => c.hora)
      )
    );
  }

  crear(datos: Omit<Cita, 'id' | 'estado'>): Observable<Cita> {
    return from(this.crearAsync(datos));
  }

  private async crearAsync(datos: Omit<Cita, 'id' | 'estado'>): Promise<Cita> {
    const citas = await this.obtenerTodas();

    const ocupado = citas.some(
      (c) =>
        c.profesionalId === datos.profesionalId &&
        c.fecha === datos.fecha &&
        c.hora === datos.hora &&
        c.estado !== 'Cancelado'
    );

    if (ocupado) {
      throw new Error('Ese horario ya fue reservado. Elige otro.');
    }

    const nuevaCita: Cita = {
      ...datos,
      id: Date.now().toString(),
      estado: 'Confirmado',
    };

    citas.push(nuevaCita);
    await this.guardarTodas(citas);
    return nuevaCita;
  }

  actualizarEstado(id: string, estado: EstadoCita): Observable<Cita> {
    return from(this.actualizarEstadoAsync(id, estado));
  }

  private async actualizarEstadoAsync(id: string, estado: EstadoCita): Promise<Cita> {
    const citas = await this.obtenerTodas();
    const indice = citas.findIndex((c) => c.id === id);

    if (indice === -1) {
      throw new Error('Cita no encontrada');
    }

    citas[indice].estado = estado;
    await this.guardarTodas(citas);
    return citas[indice];
  }

  cancelar(id: string): Observable<Cita> {
    return this.actualizarEstado(id, 'Cancelado');
  }
}