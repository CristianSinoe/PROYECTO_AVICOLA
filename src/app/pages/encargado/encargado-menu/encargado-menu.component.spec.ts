import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncargadoMenuComponent } from './encargado-menu.component';

describe('EncargadoMenuComponent', () => {
  let component: EncargadoMenuComponent;
  let fixture: ComponentFixture<EncargadoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncargadoMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncargadoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
