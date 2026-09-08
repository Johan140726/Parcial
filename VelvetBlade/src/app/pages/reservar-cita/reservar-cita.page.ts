import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Toast } from '@capacitor/toast';
import { Servicio } from '../../models/servicio.model';
import { Profesional } from '../../models/profesional.model';
import { ProfesionalesService } from '../../services/profesionales.service';
import { CitasService } from '../../services/citas.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reservar-cita',
  templateUrl: './reservar-cita.page.html',
  styleUrls: ['./reservar-cita.page.scss'],
  standalone: false,
})
export class ReservarCitaPage implements OnInit {
  servicioSeleccionado!: Servicio;
  especialistaSeleccionado: Profesional | null = null;
  fechaSeleccionada = '';
  horarioSeleccionado = '';
  fechaMinima: string = new Date().toISOString();

  listaEspecialistas: Profesional[] = [];
  horariosDisponibles: string[] = [];
  horariosOcupados: string[] = [];

  cargandoHorarios = false;
  confirmando = false;
  errorMensaje = '';

  private readonly BLOQUES_HORARIO = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM',
  ];

  constructor(
    private router: Router,
    private profesionalesService: ProfesionalesService,
    private citasService: CitasService,
    private authService: AuthService
  ) {
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

    console.log('Servicio recibido:', this.servicioSeleccionado);
    console.log('Categoría que se usa para filtrar:', this.servicioSeleccionado.categoria);

    this.profesionalesService
      .getProfesionalesPorEspecialidad(this.servicioSeleccionado.categoria)
      .subscribe((especialistas) => {
        console.log('Especialistas encontrados:', especialistas);
        this.listaEspecialistas = especialistas;
      });
  }

  async seleccionarEspecialista(esp: Profesional) {
    this.especialistaSeleccionado = esp;
    this.horarioSeleccionado = '';
    if (this.fechaSeleccionada) {
      await this.cargarHorariosOcupados();
    }
  }

  async cambiarFecha() {
    this.horarioSeleccionado = '';
    if (this.especialistaSeleccionado) {
      await this.cargarHorariosOcupados();
    }
  }

  private async cargarHorariosOcupados() {
    if (!this.especialistaSeleccionado || !this.fechaSeleccionada) {
      return;
    }

    this.cargandoHorarios = true;
    const fecha = this.fechaSeleccionada.substring(0, 10);

    this.citasService
      .listarHorariosOcupados(this.especialistaSeleccionado.id!, fecha)
      .subscribe((ocupados) => {
        this.horariosOcupados = ocupados;
        this.horariosDisponibles = this.BLOQUES_HORARIO;
        this.cargandoHorarios = false;
      });
  }

  estaOcupado(hora: string): boolean {
    return this.horariosOcupados.includes(hora);
  }

  async seleccionarHorario(hora: string) {
    if (this.estaOcupado(hora)) {
      return;
    }
    this.horarioSeleccionado = hora;
    await Haptics.impact({ style: ImpactStyle.Light });
  }

  formValido(): boolean {
    return (
      !!this.servicioSeleccionado &&
      !!this.especialistaSeleccionado &&
      !!this.fechaSeleccionada &&
      !!this.horarioSeleccionado
    );
  }

  async crearCita() {
    if (!this.formValido() || this.confirmando) {
      return;
    }

    const usuario = this.authService.obtenerUsuarioActual();
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.confirmando = true;
    this.errorMensaje = '';

    this.citasService
      .crear({
        usuarioId: usuario.id,
        servicioId: this.servicioSeleccionado.id!,
        servicioNombre: this.servicioSeleccionado.nombre,
        profesionalId: this.especialistaSeleccionado!.id!,
        profesionalNombre: this.especialistaSeleccionado!.nombre,
        estacionAsignada: this.especialistaSeleccionado!.estacionAsignada,
        fecha: this.fechaSeleccionada.substring(0, 10),
        hora: this.horarioSeleccionado,
      })
      .subscribe({
        next: async () => {
          this.confirmando = false;
          await Haptics.impact({ style: ImpactStyle.Medium });
          await Toast.show({ text: '¡Cita agendada con éxito!', duration: 'long' });
          this.router.navigate(['/servicios']);
        },
        error: async (err) => {
          this.confirmando = false;
          this.errorMensaje = err?.message ?? 'No se pudo agendar la cita. Intenta de nuevo.';
          this.horarioSeleccionado = '';
          await this.cargarHorariosOcupados();
        },
      });
  }
}