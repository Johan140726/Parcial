import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../../services/servicios.service';
import { ProfesionalesService } from '../../services/profesionales.service';
import { Servicio, CategoriaServicio } from '../../models/servicio.model';
import { Profesional } from '../../models/profesional.model';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
  standalone: false,
})
export class ServiciosPage implements OnInit {
  // El backend solo maneja dos categorías reales: 'barberia' y 'unas'.
  categoriaActiva: CategoriaServicio = 'barberia';

  fotoPerfil: string =
    'https://img.magnific.com/foto-gratis/mujer-joven-hermosa-sueter-rosa-calido-aspecto-natural-sonriente-retrato-aislado-cabello-largo_285396-896.jpg?semt=ais_hybrid&w=740&q=80';

  todosLosServicios: Servicio[] = [];
  todosLosProfesionales: Profesional[] = [];
  cargando = true;

  constructor(
    private router: Router,
    private serviciosService: ServiciosService,
    private profesionalesService: ProfesionalesService
  ) {}

  async ngOnInit() {
    this.cargando = true;
    this.todosLosServicios = await this.serviciosService.listar();
    this.todosLosProfesionales = await this.profesionalesService.listar();
    this.cargando = false;
  }

  get serviciosFiltrados(): Servicio[] {
    return this.todosLosServicios.filter(s => s.categoria === this.categoriaActiva);
  }

  get profesionalesFiltrados(): Profesional[] {
    const especialidad = this.categoriaActiva === 'barberia' ? 'Barbero' : 'Manicurista';
    return this.todosLosProfesionales.filter(p => p.especialidad === especialidad);
  }

  cambiarCategoria(categoria: CategoriaServicio) {
    this.categoriaActiva = categoria;
  }

  irAlPerfil() {
    // Nota: aún no existe una página de perfil en la app.
    // Se deja el historial como destino temporal para no romper la navegación;
    // cuando se cree la página '/perfil' y su ruta, cambiar esta línea.
    this.router.navigate(['/historial']);
  }

  seleccionarServicio(servicio: Servicio) {
    this.router.navigate(['/reservar-cita'], {
      state: { servicioSeleccionado: servicio }
    });
  }
}
