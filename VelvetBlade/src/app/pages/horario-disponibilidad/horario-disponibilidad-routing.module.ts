import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorarioDisponibilidadPage } from './horario-disponibilidad.page';

const routes: Routes = [
  {
    path: '',
    component: HorarioDisponibilidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioDisponibilidadPageRoutingModule {}
