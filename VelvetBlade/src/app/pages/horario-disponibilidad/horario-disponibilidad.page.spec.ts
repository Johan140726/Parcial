import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HorarioDisponibilidadPage } from './horario-disponibilidad.page';

describe('HorarioDisponibilidadPage', () => {
  let component: HorarioDisponibilidadPage;
  let fixture: ComponentFixture<HorarioDisponibilidadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioDisponibilidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
