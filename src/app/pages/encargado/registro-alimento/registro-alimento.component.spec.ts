import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAlimentoComponent } from './registro-alimento.component';

describe('RegistroAlimentoComponent', () => {
  let component: RegistroAlimentoComponent;
  let fixture: ComponentFixture<RegistroAlimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAlimentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
