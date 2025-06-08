import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncargadoLayoutComponent } from './encargado-layout.component';

describe('EncargadoLayoutComponent', () => {
  let component: EncargadoLayoutComponent;
  let fixture: ComponentFixture<EncargadoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncargadoLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncargadoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
