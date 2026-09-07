import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { StorageService } from './storage.service';
import { Profesional } from '../models/profesional.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalesService {
  private apiUrl = `${environment.apiUrl}/profesionales`;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  async listar(forzarActualizacion = false): Promise<Profesional[]> {
    if (!forzarActualizacion) {
      const cache = await this.storageService.get('profesionales');
      if (cache) return cache;
    }
    const profesionales = await firstValueFrom(this.http.get<Profesional[]>(this.apiUrl));
    await this.storageService.set('profesionales', profesionales);
    return profesionales;
  }
}
