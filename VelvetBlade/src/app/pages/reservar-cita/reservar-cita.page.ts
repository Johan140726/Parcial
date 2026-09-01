import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservar-cita',
  templateUrl: './reservar-cita.page.html',
  styleUrls: ['./reservar-cita.page.scss'],
  standalone: false,
})
export class ReservarCitaPage implements OnInit {
  servicioSeleccionado: any;
  especialistaSeleccionado: any = null;
  fechaSeleccionada: string = '';
  horarioSeleccionado: string = '';
  fechaMinima: string = new Date().toISOString();

  // Especialistas para damas / estética capilar
  especialistasDamas = [
    { nombre: 'Valeria Gómez', estacionAsignada: 'Estación Stylist 1', calificacion: 4.9, imagen: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    { nombre: 'Sofía Martínez', estacionAsignada: 'Estación Stylist 2', calificacion: 4.8, imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' },
    { nombre: 'Lucía Torres', estacionAsignada: 'Estación Stylist 3', calificacion: 5.0, imagen: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' }
  ];

  // Especialistas para caballeros / barbería
  especialistasCaballeros = [
    { nombre: 'Carlos Mendoza', estacionAsignada: 'Estación Barber 1', calificacion: 4.9, imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { nombre: 'Mateo Rincón', estacionAsignada: 'Estación Barber 2', calificacion: 4.8, imagen: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
    { nombre: 'Andrés Vera', estacionAsignada: 'Estación Barber 3', calificacion: 5.0, imagen: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' }
  ];

  listaEspecialistas: any[] = [];

  horariosDisponibles: string[] = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'
  ];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.servicioSeleccionado = navigation.extras.state['servicioSeleccionado'];
    }
  }

  ngOnInit() {
    if (!this.servicioSeleccionado) {
      this.router.navigate(['/servicios']);
      return;
    }

    const nombreServicio = (this.servicioSeleccionado.nombre || '').toLowerCase();
    const descServicio = (this.servicioSeleccionado.descripcion || '').toLowerCase();
    const categoriaServicio = (this.servicioSeleccionado.categoria || this.servicioSeleccionado.tipo || '').toLowerCase();

    const esDama = 
      categoriaServicio.includes('dama') || 
      categoriaServicio.includes('mujer') || 
      nombreServicio.includes('dama') || 
      nombreServicio.includes('hidratación') || 
      nombreServicio.includes('capilar') || 
      nombreServicio.includes('cepillado') || 
      nombreServicio.includes('maquillaje') ||
      descServicio.includes('keratina');

    this.listaEspecialistas = esDama ? this.especialistasDamas : this.especialistasCaballeros;
  }

  seleccionarEspecialista(esp: any) {
    this.especialistaSeleccionado = esp;
  }

  seleccionarHorario(hora: string) {
    this.horarioSeleccionado = hora;
  }

  formValido(): boolean {
    return !!this.servicioSeleccionado && 
           !!this.especialistaSeleccionado && 
           !!this.fechaSeleccionada && 
           !!this.horarioSeleccionado;
  }

  crearCita() {
    if (this.formValido()) {
      const nuevaCita = {
        servicio: this.servicioSeleccionado,
        especialista: this.especialistaSeleccionado,
        fecha: this.fechaSeleccionada,
        horario: this.horarioSeleccionado
      };
      console.log('Cita creada exitosamente:', nuevaCita);
      alert('¡Cita agendada con éxito!');
      
      // Redirige a la página de servicios
      this.router.navigate(['/servicios']);
    }
  }
}