import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Profesional } from '../models/profesional.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalesService {
  private profesionalesMock: Profesional[] = [
    {
      id: '1',
      nombre: 'Carlos Mendoza',
      especialidad: 'barberia',
      estacionAsignada: 'Estación Barbería 1',
      calificacion: 4.9,
      activo: true
    },
    {
      id: '2',
      nombre: 'Mateo Rincón',
      especialidad: 'barberia',
      estacionAsignada: 'Estación Barbería 2',
      calificacion: 4.8,
      activo: true
    },
    {
      id: '3',
      nombre: 'Valentina Torres',
      especialidad: 'spa',
      estacionAsignada: 'Estación Spa 1',
      calificacion: 5.0,
      activo: true
    },
    {
      id: '4',
      nombre: 'Sofía Gómez',
      especialidad: 'spa',
      estacionAsignada: 'Estación Spa 2',
      calificacion: 4.9,
      activo: true
    }
  ];

  constructor() { }

  getProfesionales(): Observable<Profesional[]> {
    return of(this.profesionalesMock);
  }

  getProfesionalesPorEspecialidad(especialidad: 'barberia' | 'spa'): Observable<Profesional[]> {
    const filtrados = this.profesionalesMock.filter(p => p.especialidad === especialidad && p.activo);
    return of(filtrados);
  }
}