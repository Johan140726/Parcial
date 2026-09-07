import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { StorageService } from './storage.service';
import { Servicio } from '../models/servicio.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = `${environment.apiUrl}/servicios`;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  async listar(forzarActualizacion = false): Promise<Servicio[]> {
    if (!forzarActualizacion) {
      const cache = await this.storageService.get('servicios');
      if (cache) return cache;
    }
    const servicios = await firstValueFrom(this.http.get<Servicio[]>(this.apiUrl));
    await this.storageService.set('servicios', servicios);
    return servicios;
  }
}
