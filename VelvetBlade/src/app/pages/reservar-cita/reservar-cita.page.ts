import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfesionalesService } from '../../services/profesionales.service';
import { CitasService } from '../../services/citas.service';
import { StorageService } from '../../services/storage.service';
import { Servicio } from '../../models/servicio.model';
import { Profesional } from '../../models/profesional.model';

@Component({
  selector: 'app-reservar-cita',
  templateUrl: './reservar-cita.page.html',
  styleUrls: ['./reservar-cita.page.scss'],
  standalone: false,
})
export class ReservarCitaPage implements OnInit {
  servicioSeleccionado!: Servicio;
  especialistaSeleccionado: Profesional | null = null;
  fechaSeleccionada: string = '';
  horarioSeleccionado: string = '';
  fechaMinima: string = new Date().toISOString();

  listaEspecialistas: Profesional[] = [];
  horasOcupadas: string[] = [];

  guardando = false;
  errorCita = '';
  cargandoEspecialistas = true;

  horariosDisponibles: string[] = [
    '09:00', '10:00', '11:00',
    '14:00', '15:30', '17:00', '18:30'
  ];

  constructor(
    private router: Router,
    private profesionalesService: ProfesionalesService,
    private citasService: CitasService,
    private storageService: StorageService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.servicioSeleccionado = navigation.extras.state['servicioSeleccionado'];
    }
  }

  async ngOnInit() {
    if (!this.servicioSeleccionado) {
      this.router.navigate(['/servicios']);
      return;
    }
    await this.cargarEspecialistas();
  }

  async cargarEspecialistas() {
    this.cargandoEspecialistas = true;
    const todos = await this.profesionalesService.listar();

    // El backend relaciona categoría de servicio <-> especialidad real:
    // 'barberia' -> 'Barbero', 'unas' -> 'Manicurista'
    const especialidadEsperada =
      this.servicioSeleccionado.categoria === 'barberia' ? 'Barbero' : 'Manicurista';

    this.listaEspecialistas = todos.filter(p => p.especialidad === especialidadEsperada);
    this.cargandoEspecialistas = false;
  }

  seleccionarEspecialista(esp: Profesional) {
    this.especialistaSeleccionado = esp;
    if (this.fechaSeleccionada) {
      this.actualizarDisponibilidad();
    }
  }

  // ✅ Método corregido para aceptar el tipo amplio
  async onFechaChange(value: string | string[] | null | undefined) {
    if (typeof value === 'string') {
      this.fechaSeleccionada = value;
      if (this.especialistaSeleccionado) {
        await this.actualizarDisponibilidad();
      }
    } else {
      console.warn('Fecha no válida', value);
      this.fechaSeleccionada = '';
      this.horasOcupadas = [];
    }
  }

  async actualizarDisponibilidad() {
    if (!this.especialistaSeleccionado?.id) return;

    const fechaNormalizada = this.fechaSeleccionada.split('T')[0]; // 'YYYY-MM-DD'
    this.horasOcupadas = await this.citasService.horariosOcupados(
      this.especialistaSeleccionado.id,
      fechaNormalizada
    );

    if (this.horarioSeleccionado && this.horasOcupadas.includes(this.horarioSeleccionado)) {
      this.horarioSeleccionado = '';
    }
  }

  seleccionarHorario(hora: string) {
    if (!this.horasOcupadas.includes(hora)) {
      this.horarioSeleccionado = hora;
    }
  }

  formValido(): boolean {
    return !!this.servicioSeleccionado &&
           !!this.especialistaSeleccionado &&
           !!this.fechaSeleccionada &&
           !!this.horarioSeleccionado;
  }

  async crearCita() {
  console.log('▶️ crearCita() ejecutado');

  if (!this.formValido()) {
    console.warn('⚠️ Formulario inválido');
    return;
  }

  this.guardando = true;
  this.errorCita = '';

  const usuario = await this.storageService.get('usuario');
  console.log('👤 Usuario obtenido:', usuario);

  if (!usuario?.id) {
    this.errorCita = 'Debes iniciar sesión para reservar una cita.';
    this.guardando = false;
    return;
  }

  const datosCita = {
    usuarioId: usuario.id,
    servicioId: this.servicioSeleccionado.id,
    profesionalId: this.especialistaSeleccionado!.id,
    fecha: this.fechaSeleccionada.split('T')[0],
    hora: this.horarioSeleccionado,
  };
  console.log('📋 Datos de la cita a enviar:', datosCita);

  try {
    const respuesta = await this.citasService.crear(datosCita);
    console.log('✅ Cita creada exitosamente:', respuesta);
    this.router.navigate(['/historial']);
  } catch (error: any) {
    console.error('❌ Error al crear cita:', error);
    this.errorCita = error?.error?.error ?? error?.message ?? 'No se pudo agendar la cita.';
  } finally {
    this.guardando = false;
    console.log('🏁 Estado guardando = false');
  }
}
}