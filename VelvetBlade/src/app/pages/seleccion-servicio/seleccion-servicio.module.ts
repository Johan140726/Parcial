import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionServicioPageRoutingModule } from './seleccion-servicio-routing.module';

import { SeleccionServicioPage } from './seleccion-servicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionServicioPageRoutingModule
  ],
  declarations: [SeleccionServicioPage]
})
export class SeleccionServicioPageModule {}
