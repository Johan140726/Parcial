import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
  standalone: false,
})
export class ServiciosPage implements OnInit {
  categoriaPrincipal: string = 'caballeros';
  subFiltroCaballeros: string = 'corte';
  subFiltroDamas: string = 'cabello';

  fotoPerfil: string = 'https://img.magnific.com/foto-gratis/mujer-joven-hermosa-sueter-rosa-calido-aspecto-natural-sonriente-retrato-aislado-cabello-largo_285396-896.jpg?semt=ais_hybrid&w=740&q=80';

  serviciosCaballerosCorte = [
    { nombre: 'Barba', descripcion: 'Perfilamiento & Desvanecido De Barba', precio: 13000, duracionMinutos: 15, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGJP8QVTdvHPx4EmYmBu5iEHb8EX92ta_MOYfYFbEwxwU5gGIyGFwemE&s=10' },
    { nombre: 'Corte + Limpieza Facial', descripcion: 'Corte & Limpieza Facial Intensiva', precio: 70000, duracionMinutos: 50, imagen: 'https://cdn.atrapalo.com/o/event/294334/1017525.jpg?auto=avif&width=1280&quality=75' },
    { nombre: 'Corte + Barba y Rasurado Con Espuma + Exfoliacion Facial', descripcion: 'Corte Con Barba & Mascarilla', precio: 60000, duracionMinutos: 50, imagen: 'https://www.matizhombres.cl/wp-content/uploads/2024/04/5ed688445c5f2.jpg' },
    { nombre: 'Corte Infantil (Styler)', descripcion: 'Corte especial y paciente para niños.', precio: 30000, duracionMinutos: 30, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBLWB-QshJ8Hv3XPHfy8hVx4EkU5USS6BxzzjbbYHytzyk_gaq9wvwTy8_&s=10' },
    { nombre: 'Corte', descripcion: 'Corte rapado uniforme de bajo mantenimiento.', precio: 24000, duracionMinutos: 40, imagen: 'https://i.pinimg.com/originals/1f/f9/27/1ff9276798494d223350f3254f0b4ce5.jpg' },
    { nombre: 'Corte con Diseño Freestyle', descripcion: 'Líneas y patrones personalizados en máquina.', precio: 45000, duracionMinutos: 45, imagen: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=500&q=80' },
    { nombre: 'Corte & Barba', descripcion: 'Ideal para cabellos largos y volumen natural.', precio: 42000, duracionMinutos: 40, imagen: 'https://heyjoe.es/wp-content/uploads/hombre-barbudo-guapo-joven-bigote-largo-barba_120494-1.jpg' },
  ];

  serviciosCaballerosUnas = [
    { nombre: 'Manicure Ejecutivo', descripcion: 'Limpieza e hidratación profunda para manos.', precio: 28000, duracionMinutos: 30, imagen: 'https://www.talkinheads.net/wp-content/uploads/2018/01/man_manicure_1.jpg' },
    { nombre: 'Masaje Relax para Manos', descripcion: 'Alivio de tensión con aceites esenciales.', precio: 26000, duracionMinutos: 20, imagen: 'https://crisnail.es/wp-content/uploads/2018/01/masaje-de-manos.jpg' },
    { nombre: 'Limpieza de Cutículas Plus', descripcion: 'Remoción minuciosa y cuidado dermatológico.', precio: 20000, duracionMinutos: 20, imagen: 'https://masquemanos.com/wp-content/uploads/2021/06/tratamientos-de-Manos-para-hombres.jpg' },
    { nombre: 'Kit Cuidado Total Caballeros', descripcion: 'Manicure y pedicure completo con mascarilla.', precio: 70000, duracionMinutos: 75, imagen: 'https://albertodugarte.com/wp-content/uploads/2023/11/Tipos-de-unas-para-hombres-manicura.jpg' }
  ];

  serviciosCaballerosCejas = [
    { nombre: 'Cejas Con Cera', descripcion: 'Marcación precisa adaptada a tu estructura.', precio: 10000, duracionMinutos: 15, imagen: 'https://modaellos.com/wp-content/uploads/2012/07/depilar-el-entrecejo-600x400.jpg' },
    { nombre: 'Cejas Con Hilo', descripcion: 'Definición Duradera.', precio: 12000, duracionMinutos: 15, imagen: 'https://mastercejas.com/wp-content/uploads/2019/05/DEPILACI%C3%93N-CON-HILO-EN-CEJAS-HOMBRE-1030x747.jpg' },
    { nombre: 'Cejas Con Cuchilla', descripcion: 'Perfilamiento De Cejas', precio: 5000, duracionMinutos: 30, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4VziZsiLKhpC-7TanyZK4GwLtyXruHsimw_yOEvOT_hvaqptTRlG5-1EP&s=10' },
  ];

  serviciosDamasCabello = [
    { nombre: 'Corte y Brushing Profesional', descripcion: 'Corte de puntas y acabado con secador.', precio: 55000, duracionMinutos: 50, imagen: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=500&q=80' },
    { nombre: 'Hidratación Capilar Intensiva', descripcion: 'Nutrición con ampolletas de keratina pura.', precio: 65000, duracionMinutos: 45, imagen: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=500&q=80' },
    { nombre: 'Cepillado / Blower Studio', descripcion: 'Lichado o ondas suaves de larga duración.', precio: 40000, duracionMinutos: 40, imagen: 'https://st4.depositphotos.com/4218696/20136/i/450/depositphotos_201365098-stock-photo-hairdresser-drying-womans-hair-in.jpg' },
    { nombre: 'Corte Bob / Cambio de Look', descripcion: 'Diseño estructural de imagen y estilismo.', precio: 70000, duracionMinutos: 60, imagen: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=500&q=80' },
    { nombre: 'Cauterización Capilar', descripcion: 'Sellado de cutícula y control de frizz total.', precio: 95000, duracionMinutos: 70, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeLoxwNZ48ADljRV7FTZSUijp6b_yjX-3p11JCtSFU1r4XyZbWL6o4Nnc&s=10' },
    { nombre: 'Botox Capilar Rejuvenecedor', descripcion: 'Devuelve la vitalidad y brillo al cabello maltratado.', precio: 110000, duracionMinutos: 90, imagen: 'https://www.capilarea.com/wp-content/uploads/2023/12/botox-capilar.jpg' },
    { nombre: 'Peinado para Ocasión Especial', descripcion: 'Recogidos o semi-recogidos elegantes.', precio: 80000, duracionMinutos: 60, imagen: 'https://www.talkinheads.net/wp-content/uploads/2022/07/promlonghairfeatured.jpg' },
    { nombre: 'Exfoliación de Cuerudo Cabelludo', descripcion: 'Desintoxicación y estímulo del folículo.', precio: 45000, duracionMinutos: 35, imagen: 'https://editorialtelevisa.brightspotcdn.com/dims4/default/dc86515/2147483647/strip/true/crop/900x507+0+47/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk2-prod-editorial-televisa.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fwp-content%2Fuploads%2F2018%2F12%2Fexfoliacion-cuero-cabelludo-add-.jpg' },
    { nombre: 'Tratamiento Anticaída con LED', descripcion: 'Terapia láser suave de estimulación capilar.', precio: 90000, duracionMinutos: 50, imagen: 'https://http2.mlstatic.com/D_NQ_NP_672585-CBT113530896274_072026-O.webp' }
  ];

  serviciosDamasUnas = [
    { nombre: 'Manicure Semipermanente Gel', descripcion: 'Esmaltado impecable por más de 3 semanas.', precio: 45000, duracionMinutos: 45, imagen: 'https://nailcoffee.com.mx/wp-content/uploads/2023/04/gelsemi.jpg' },
    { nombre: 'Uñas Acrílicas Full Set', descripcion: 'Extensiones esculpidas con diseño incluido.', precio: 85000, duracionMinutos: 90, imagen: 'https://i.pinimg.com/originals/8f/75/c1/8f75c125a5a4a4045da61d0810c53a4f.jpg' },
    { nombre: 'Pedicure Spa Completo', descripcion: 'Pies suaves con exfoliación y semipermanente.', precio: 55000, duracionMinutos: 50, imagen: 'https://rosadayspa.es/wp-content/uploads/2024/07/pedicura-spa.jpg' },
    { nombre: 'Kapping Gel Protector', descripcion: 'Capa de refuerzo sobre uña natural.', precio: 55000, duracionMinutos: 50, imagen: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=500&q=80' },
    { nombre: 'Nail Art Minimalista', descripcion: 'Diseños delicados y elegantes por uña.', precio: 20000, duracionMinutos: 25, imagen: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=500&q=80' },
    { nombre: 'Retiro de Acrílico Profesional', descripcion: 'Proceso cuidadoso sin dañar tu uña.', precio: 18000, duracionMinutos: 20, imagen: 'https://static.wixstatic.com/media/11062b_f97e381c9dfa40abbb5ad19a019e9062~mv2.jpg/v1/fill/w_568,h_380,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_f97e381c9dfa40abbb5ad19a019e9062~mv2.jpg' },
    { nombre: 'Spa de Manos con Parafina', descripcion: 'Hidratación profunda y suavidad extrema.', precio: 38000, duracionMinutos: 35, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3jTcFnDrBQryWPBXg09d86E78j43gVS8CnH5Du-dcaSdV_D9Ly9tiPC4E&s=10' },
  ];

  serviciosDamasCejas = [
    { nombre: 'Diseño de Cejas con Hilo', descripcion: 'Depilación milimétrica y definición natural.', precio: 12000, duracionMinutos: 20, imagen: 'https://www.laspestanasdejulia.com/wp-content/uploads/2022/07/depilacion-cejas-con-hilo-valencia.jpg' },
    { nombre: 'Lifting de Pestañas con Keratina', descripcion: 'Curvatura impactante sin extensiones.', precio: 60000, duracionMinutos: 60, imagen: 'https://cdn.versum.net/gallery_items/712548/thumb_300_300/WhatsApp_Image_20230402_at_17.25.07_2.jpeg?1680470846' },
    { nombre: 'Diseño de Cejas con Cera', descripcion: 'Efecto sombra duradero y organizado.', precio: 10000, duracionMinutos: 45, imagen: 'https://www.outletmandara.com/blog/wp-content/uploads/2021/11/Dise%C3%B1o-sin-t%C3%adtulo-2021-11-24T104005.739-1024x1024.png' },
    { nombre: 'Combo Mirada Perfecta', descripcion: 'Laminación de cejas + lifting de pestañas.', precio: 100000, duracionMinutos: 90, imagen: 'https://static.vecteezy.com/system/resources/thumbnails/068/860/323/small/close-up-of-a-young-woman-s-face-showcasing-perfectly-shaped-eyebrows-and-lush-eyelashes-ideal-for-beauty-cosmetics-and-makeup-advertising-photo.jpg' }
  ];

  profesionalesCaballeros = [
    { nombre: 'Carlos Mendoza', estacionAsignada: 'Estación Barber 1', calificacion: 4.9, imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { nombre: 'Mateo Rincón', estacionAsignada: 'Estación Barber 2', calificacion: 4.8, imagen: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
    { nombre: 'Andrés Vera', estacionAsignada: 'Estación Barber 3', calificacion: 5.0, imagen: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' }
  ];

  profesionalesDamas = [
    { nombre: 'Sofía Valencia', estacionAsignada: 'Estación Stylist 1', calificacion: 4.9, imagen: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    { nombre: 'Valentina Gómez', estacionAsignada: 'Estación Spa 1', calificacion: 4.7, imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' },
    { nombre: 'Camila Torres', estacionAsignada: 'Estación Beauty 2', calificacion: 4.9, imagen: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  actualizarFotoPerfil(nuevaUrl: string) {
    this.fotoPerfil = nuevaUrl;
  }

  irAlPerfil() {
    this.router.navigate(['/historial-citas']);
  }
  async cerrarSesion() {
    const alerta = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Seguro que quieres cerrar tu sesión?',
      buttons: [
        { text: 'No', role: 'cancel' },
        {
          text: 'Sí, cerrar sesión',
          role: 'destructive',
          handler: () => {
            this.authService.cerrarSesion();
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alerta.present();
  }

  cambiarCategoriaPrincipal(cat: string) {
    this.categoriaPrincipal = cat;
  }

  cambiarSubFiltroCaballeros(sub: string) {
    this.subFiltroCaballeros = sub;
  }

  cambiarSubFiltroDamas(sub: string) {
    this.subFiltroDamas = sub;
  }

  private generarId(nombre: string): string {
    return nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  seleccionarServicio(servicio: any) {
    const servicioConCategoria = {
      ...servicio,
      id: this.generarId(servicio.nombre),
      categoria: this.categoriaPrincipal === 'caballeros' ? 'caballeros' : 'damas',
    };

    this.router.navigate(['/reservar-cita'], {
      state: { servicioSeleccionado: servicioConCategoria }
    });
  }
}