import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParvadaDetailComponent } from './parvada-detail.component';

describe('ParvadaDetailComponent', () => {
  let component: ParvadaDetailComponent;
  let fixture: ComponentFixture<ParvadaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParvadaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParvadaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
