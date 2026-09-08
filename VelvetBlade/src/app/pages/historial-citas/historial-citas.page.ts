import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Toast } from '@capacitor/toast';
import { Cita, EstadoCita } from '../../models/cita.model';
import { CitasService } from '../../services/citas.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-historial-citas',
  templateUrl: './historial-citas.page.html',
  styleUrls: ['./historial-citas.page.scss'],
  standalone: false,
})
export class HistorialCitasPage implements OnInit {
  cargando = true;
  errorMensaje = '';
  vista: 'activas' | 'historial' = 'activas';
  cancelandoId: string | null = null;

  private todasLasCitas: Cita[] = [];

  constructor(
    private citasService: CitasService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.authService.esperarListo();
    const usuario = this.authService.obtenerUsuarioActual();

    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargarCitas(usuario.id!);
  }

  private cargarCitas(usuarioId: number) {
    this.cargando = true;
    this.errorMensaje = '';

    this.citasService.listarPorUsuario(usuarioId).subscribe({
      next: (citas) => {
        this.todasLasCitas = citas.sort((a, b) => (a.fecha + a.hora < b.fecha + b.hora ? 1 : -1));
        this.cargando = false;
        this.cdr.detectChanges(); // fuerza el repintado sin depender de zone.js
      },
      error: () => {
        this.errorMensaje = 'No se pudieron cargar tus citas.';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  cambiarVista(vista: string | number | undefined) {
    if (vista === undefined) {
      return;
    }
    this.vista = vista as 'activas' | 'historial';
  }

  private esActiva(estado: EstadoCita): boolean {
    return estado === 'Confirmado' || estado === 'En Atención';
  }

  get citasFiltradas(): Cita[] {
    return this.todasLasCitas.filter((c) =>
      this.vista === 'activas' ? this.esActiva(c.estado) : !this.esActiva(c.estado)
    );
  }

  puedeCancelar(cita: Cita): boolean {
    return cita.estado === 'Confirmado';
  }

  async cancelarCita(cita: Cita) {
    const alerta = await this.alertController.create({
      header: 'Cancelar cita',
      message: `¿Seguro que quieres cancelar tu cita de ${cita.servicioNombre} el ${cita.fecha} a las ${cita.hora}?`,
      buttons: [
        { text: 'No', role: 'cancel' },
        { text: 'Sí, cancelar', role: 'destructive', handler: () => this.confirmarCancelacion(cita) },
      ],
    });

    await alerta.present();
  }

  private confirmarCancelacion(cita: Cita) {
    this.cancelandoId = cita.id;
    this.cdr.detectChanges(); // para que se vea "Cancelando..." de inmediato

    this.citasService.cancelar(cita.id).subscribe({
      next: async (citaActualizada) => {
        const indice = this.todasLasCitas.findIndex((c) => c.id === cita.id);
        if (indice !== -1) {
          this.todasLasCitas = [
            ...this.todasLasCitas.slice(0, indice),
            citaActualizada,
            ...this.todasLasCitas.slice(indice + 1),
          ];
        }
        this.cancelandoId = null;
        this.cdr.detectChanges(); // fuerza el repintado inmediato tras cancelar
        await Toast.show({ text: 'Cita cancelada' });
      },
      error: () => {
        this.errorMensaje = 'No se pudo cancelar la cita.';
        this.cancelandoId = null;
        this.cdr.detectChanges();
      },
    });
  }

  colorEstado(estado: EstadoCita): string {
    switch (estado) {
      case 'Confirmado':
        return 'success';
      case 'En Atención':
        return 'warning';
      case 'Completado':
        return 'medium';
      case 'Cancelado':
        return 'danger';
    }
  }
}