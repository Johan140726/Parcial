import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Observable, from } from 'rxjs';
import { Servicio } from '../models/servicio.model';

const CLAVE_SERVICIOS = 'vb_servicios';

const SERVICIOS_INICIALES: Servicio[] = [
  {
    id: '1',
    nombre: 'Corte Clásico & Estilo',
    descripcion: 'Corte de cabello personalizado con asesoría, lavado y peinado.',
    precio: 35000,
    duracionMinutos: 30,
    categoria: 'barberia',
  },
  {
    id: '2',
    nombre: 'Barba Tradicional',
    descripcion: 'Perfilado de barba con toallas calientes y productos hidratantes.',
    precio: 25000,
    duracionMinutos: 25,
    categoria: 'barberia',
  },
  {
    id: '3',
    nombre: 'Manicura Semipermanente',
    descripcion: 'Limpieza profunda, exfoliación, nivelación y esmaltado LED.',
    precio: 45000,
    duracionMinutos: 45,
    categoria: 'spa',
  },
  {
    id: '4',
    nombre: 'Pedicura Spa',
    descripcion: 'Hidratación profunda, tratamiento de cutículas y reflexología.',
    precio: 55000,
    duracionMinutos: 50,
    categoria: 'spa',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  private async obtenerTodos(): Promise<Servicio[]> {
    const { value } = await Preferences.get({ key: CLAVE_SERVICIOS });

    if (!value) {
      // Primera vez que corre la app: sembramos el catálogo inicial.
      await Preferences.set({
        key: CLAVE_SERVICIOS,
        value: JSON.stringify(SERVICIOS_INICIALES),
      });
      return SERVICIOS_INICIALES;
    }

    return JSON.parse(value) as Servicio[];
  }

  getServicios(): Observable<Servicio[]> {
    return from(this.obtenerTodos());
  }

  getServiciosPorCategoria(categoria: 'barberia' | 'spa'): Observable<Servicio[]> {
    return from(
      this.obtenerTodos().then((servicios) =>
        servicios.filter((s) => s.categoria === categoria)
      )
    );
  }
}