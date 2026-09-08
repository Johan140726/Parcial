export type EstadoCita = 'Confirmado' | 'En Atención' | 'Completado' | 'Cancelado';

export interface Cita {
  id: string;
  usuarioId?: number;
  servicioId: string;
  servicioNombre: string;
  profesionalId: string;
  profesionalNombre: string;
  estacionAsignada: string;
  fecha: string; // 'YYYY-MM-DD'
  hora: string;
  estado: EstadoCita;
}