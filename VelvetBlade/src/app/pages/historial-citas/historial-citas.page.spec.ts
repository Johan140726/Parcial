import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialCitasPage } from './historial-citas.page';

describe('HistorialCitasPage', () => {
  let component: HistorialCitasPage;
  let fixture: ComponentFixture<HistorialCitasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialCitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
