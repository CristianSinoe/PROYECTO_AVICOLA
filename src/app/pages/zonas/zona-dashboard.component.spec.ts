import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaDashboardComponent } from './zona-dashboard.component';

describe('ZonaDashboardComponent', () => {
  let component: ZonaDashboardComponent;
  let fixture: ComponentFixture<ZonaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonaDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
