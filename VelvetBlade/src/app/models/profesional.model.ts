export interface Profesional {
  id: string;
  nombre: string;
  especialidad: 'caballeros' | 'damas';
  estacionAsignada: string;
  calificacion: number;
  avatar?: string;
  activo: boolean;
}