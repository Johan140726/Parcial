export type TipoPerfil = 'Cliente' | 'Especialista';

export interface Usuario {
  id?: string;
  nombreCompleto: string;
  telefono: string;
  correo: string;
  clave: string;
  tipoPerfil: TipoPerfil;
  aceptaTerminos: boolean;
}
