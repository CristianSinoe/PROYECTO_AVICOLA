import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMortalidadComponent } from './registro-mortalidad.component';

describe('RegistroMortalidadComponent', () => {
  let component: RegistroMortalidadComponent;
  let fixture: ComponentFixture<RegistroMortalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroMortalidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroMortalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
