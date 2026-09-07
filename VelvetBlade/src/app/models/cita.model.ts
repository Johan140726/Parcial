export type EstadoCita = 'confirmado' | 'cancelado' | 'completado';

export interface Cita {
  id: string;
  usuarioId: string;
  servicioId: string;
  profesionalId: string;
  fecha: string;   // 'YYYY-MM-DD'
  hora: string;    // 'HH:mm'
  estado: EstadoCita;
}

export interface NuevaCita {
  usuarioId: string;
  servicioId: string;
  profesionalId: string;
  fecha: string;
  hora: string;
}