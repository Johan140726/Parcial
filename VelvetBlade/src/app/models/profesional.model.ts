export interface Profesional {
  id?: string;
  nombre: string;
  especialidad: 'barberia' | 'spa';
  estacionAsignada: string;
  calificacion: number;
  avatar?: string;
  activo: boolean;
}