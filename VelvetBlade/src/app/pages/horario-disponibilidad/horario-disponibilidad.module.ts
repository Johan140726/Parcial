import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorarioDisponibilidadPageRoutingModule } from './horario-disponibilidad-routing.module';

import { HorarioDisponibilidadPage } from './horario-disponibilidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioDisponibilidadPageRoutingModule
  ],
  declarations: [HorarioDisponibilidadPage]
})
export class HorarioDisponibilidadPageModule {}
