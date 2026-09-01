import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'seleccion-servicio',
    loadChildren: () => import('./pages/seleccion-servicio/seleccion-servicio.module')
      .then(m => m.SeleccionServicioPageModule)
    // Se removió el canActivate para permitir el acceso fluido desde servicios
  },
  {
    path: 'horario-disponibilidad',
    loadChildren: () => import('./pages/horario-disponibilidad/horario-disponibilidad.module').then( m => m.HorarioDisponibilidadPageModule)
  },
  {
    path: 'historial-citas',
    loadChildren: () => import('./pages/historial-citas/historial-citas.module').then( m => m.HistorialCitasPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./pages/servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
  {
    path: 'reservar-cita',
    loadChildren: () => import('./pages/reservar-cita/reservar-cita.module').then( m => m.ReservarCitaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }