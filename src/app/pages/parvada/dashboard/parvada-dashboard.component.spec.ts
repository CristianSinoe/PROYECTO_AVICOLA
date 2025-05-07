import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParvadaDashboardComponent } from './parvada-dashboard.component';

describe('ParvadaDashboardComponent', () => {
  let component: ParvadaDashboardComponent;
  let fixture: ComponentFixture<ParvadaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParvadaDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParvadaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
