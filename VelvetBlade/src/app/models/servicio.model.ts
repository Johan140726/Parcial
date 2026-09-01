export interface Servicio {
  id?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracionMinutos: number;
  categoria: 'barberia' | 'spa';
  imagen?: string;
}