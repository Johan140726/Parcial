import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Observable, from } from 'rxjs';
import { Profesional } from '../models/profesional.model';

const CLAVE_PROFESIONALES = 'vb_profesionales_v2';

const PROFESIONALES_INICIALES: Profesional[] = [
  { id: 'p1', nombre: 'Carlos Mendoza', especialidad: 'caballeros', estacionAsignada: 'Estación Barber 1', calificacion: 4.9, activo: true },
  { id: 'p2', nombre: 'Mateo Rincón', especialidad: 'caballeros', estacionAsignada: 'Estación Barber 2', calificacion: 4.8, activo: true },
  { id: 'p3', nombre: 'Andrés Vera', especialidad: 'caballeros', estacionAsignada: 'Estación Barber 3', calificacion: 5.0, activo: true },
  { id: 'p4', nombre: 'Sofía Valencia', especialidad: 'damas', estacionAsignada: 'Estación Stylist 1', calificacion: 4.9, activo: true },
  { id: 'p5', nombre: 'Valentina Gómez', especialidad: 'damas', estacionAsignada: 'Estación Spa 1', calificacion: 4.7, activo: true },
  { id: 'p6', nombre: 'Camila Torres', especialidad: 'damas', estacionAsignada: 'Estación Beauty 2', calificacion: 4.9, activo: true },
];

@Injectable({
  providedIn: 'root',
})
export class ProfesionalesService {
  private async obtenerTodos(): Promise<Profesional[]> {
    const { value } = await Preferences.get({ key: CLAVE_PROFESIONALES });

    if (!value) {
      await Preferences.set({
        key: CLAVE_PROFESIONALES,
        value: JSON.stringify(PROFESIONALES_INICIALES),
      });
      return PROFESIONALES_INICIALES;
    }

    return JSON.parse(value) as Profesional[];
  }

  getProfesionales(): Observable<Profesional[]> {
    return from(this.obtenerTodos());
  }

  getProfesionalesPorEspecialidad(especialidad: 'caballeros' | 'damas'): Observable<Profesional[]> {
    return from(
      this.obtenerTodos().then((profesionales) =>
        profesionales.filter((p) => p.especialidad === especialidad && p.activo)
      )
    );
  }
}