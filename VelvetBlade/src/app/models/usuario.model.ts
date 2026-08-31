export type TipoPerfil = 'Cliente' | 'Especialista';

export interface Usuario {
  id?: number;
  nombreCompleto: string;
  telefono: string;
  correo: string;
  clave: string;
  tipoPerfil: TipoPerfil;
  aceptaTerminos: boolean;
}