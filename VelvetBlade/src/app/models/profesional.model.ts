export type EspecialidadProfesional = 'Barbero' | 'Manicurista';

export interface Profesional {
  id: string;
  nombre: string;
  especialidad: EspecialidadProfesional;
  estacion: string;
}
