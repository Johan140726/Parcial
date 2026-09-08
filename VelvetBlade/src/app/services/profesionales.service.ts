import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Observable, from } from 'rxjs';
import { Profesional } from '../models/profesional.model';

const CLAVE_PROFESIONALES = 'vb_profesionales';

const PROFESIONALES_INICIALES: Profesional[] = [
  {
    id: '1',
    nombre: 'Carlos Mendoza',
    especialidad: 'barberia',
    estacionAsignada: 'Estación Barbería 1',
    calificacion: 4.9,
    activo: true,
  },
  {
    id: '2',
    nombre: 'Mateo Rincón',
    especialidad: 'barberia',
    estacionAsignada: 'Estación Barbería 2',
    calificacion: 4.8,
    activo: true,
  },
  {
    id: '3',
    nombre: 'Valentina Torres',
    especialidad: 'spa',
    estacionAsignada: 'Estación Spa 1',
    calificacion: 5.0,
    activo: true,
  },
  {
    id: '4',
    nombre: 'Sofía Gómez',
    especialidad: 'spa',
    estacionAsignada: 'Estación Spa 2',
    calificacion: 4.9,
    activo: true,
  },
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

  getProfesionalesPorEspecialidad(especialidad: 'barberia' | 'spa'): Observable<Profesional[]> {
    return from(
      this.obtenerTodos().then((profesionales) =>
        profesionales.filter((p) => p.especialidad === especialidad && p.activo)
      )
    );
  }
}