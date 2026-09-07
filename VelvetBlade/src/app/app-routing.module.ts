import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'seleccion-servicio',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/seleccion-servicio/seleccion-servicio.module')
      .then(m => m.SeleccionServicioPageModule)
  },
  {
    path: 'horario-disponibilidad',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/horario-disponibilidad/horario-disponibilidad.module').then( m => m.HorarioDisponibilidadPageModule)
  },
  {
    path: 'historial-citas',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/historial-citas/historial-citas.module').then( m => m.HistorialCitasPageModule)
  },
  {
    path: 'servicios',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
  {
    path: 'reservar-cita',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/reservar-cita/reservar-cita.module').then( m => m.ReservarCitaPageModule)
  },
  {
    path: 'horarios',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/horarios/horarios.module').then( m => m.HorariosPageModule)
  },
  {
    path: 'historial',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }