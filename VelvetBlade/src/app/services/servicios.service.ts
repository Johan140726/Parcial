import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Servicio } from '../models/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private serviciosMock: Servicio[] = [
    {
      id: '1',
      nombre: 'Corte Clásico & Estilo',
      descripcion: 'Corte de cabello personalizado con asesoría, lavado y peinado.',
      precio: 35000,
      duracionMinutos: 30,
      categoria: 'barberia'
    },
    {
      id: '2',
      nombre: 'Barba Tradicional',
      descripcion: 'Perfilado de barba con toallas calientes y productos hidratantes.',
      precio: 25000,
      duracionMinutos: 25,
      categoria: 'barberia'
    },
    {
      id: '3',
      nombre: 'Manicura Semipermanente',
      descripcion: 'Limpieza profunda, exfoliación, nivelación y esmaltado LED.',
      precio: 45000,
      duracionMinutos: 45,
      categoria: 'spa'
    },
    {
      id: '4',
      nombre: 'Pedicura Spa',
      descripcion: 'Hidratación profunda, tratamiento de cutículas y reflexología.',
      precio: 55000,
      duracionMinutos: 50,
      categoria: 'spa'
    }
  ];

  constructor() { }

  getServicios(): Observable<Servicio[]> {
    return of(this.serviciosMock);
  }

  getServiciosPorCategoria(categoria: 'barberia' | 'spa'): Observable<Servicio[]> {
    const filtrados = this.serviciosMock.filter(s => s.categoria === categoria);
    return of(filtrados);
  }
}