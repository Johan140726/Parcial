import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../services/citas.service';
import { StorageService } from '../../services/storage.service';
import { Cita } from '../../models/cita.model';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  standalone: false,
})
export class HistorialPage implements OnInit {
  citas: Cita[] = [];

  constructor(
    private citasService: CitasService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    const usuario = await this.storageService.get('usuario');
    if (usuario?.id) {
      this.citas = await this.citasService.listarPorUsuario(usuario.id);
    }
  }

  async cancelarCita(id: string) {
    await this.citasService.cancelar(id);
    this.citas = this.citas.map((c) => (c.id === id ? { ...c, estado: 'cancelado' } : c));
  }

  async onRefresh(event: any) {
  const usuario = await this.storageService.get('usuario');
  if (usuario?.id) {
    this.citas = await this.citasService.listarPorUsuario(usuario.id);
  }
  event.target.complete();
}
}

