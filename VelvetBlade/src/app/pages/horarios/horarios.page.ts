import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitasService } from '../../services/citas.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
  standalone: false,
})
export class HorariosPage implements OnInit {
  horasDisponibles: string[] = ['09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00'];
  horasOcupadas: string[] = [];
  fechaSeleccionada = '';
  horaSeleccionada = '';

  profesionalId!: string;
  servicioId!: string;
  usuarioId!: string;

  // ✅ Agregamos la propiedad que usa la plantilla
  fechaMinima: string = new Date().toISOString();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private citasService: CitasService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    this.profesionalId = this.route.snapshot.queryParamMap.get('profesionalId') ?? '';
    this.servicioId = this.route.snapshot.queryParamMap.get('servicioId') ?? '';
    const usuario = await this.storageService.get('usuario');
    this.usuarioId = usuario?.id ?? '';
  }

  async onFechaChange(value: string | string[] | null | undefined) {
    if (typeof value === 'string') {
      this.fechaSeleccionada = value;
      this.horasOcupadas = await this.citasService.horariosOcupados(this.profesionalId, value);
    } else {
      console.warn('Fecha no válida', value);
      this.fechaSeleccionada = '';
      this.horasOcupadas = [];
    }
  }

  async confirmarCita() {
    const nuevaCita = await this.citasService.crear({
      usuarioId: this.usuarioId,
      servicioId: this.servicioId,
      profesionalId: this.profesionalId,
      fecha: this.fechaSeleccionada,
      hora: this.horaSeleccionada,
    });
    this.router.navigate(['/historial']);
  }
}