export type CategoriaServicio = 'barberia' | 'unas';

export interface Servicio {
  id: string;
  nombre: string;
  categoria: CategoriaServicio;
  descripcion: string;
  duracion: number; // minutos
}
