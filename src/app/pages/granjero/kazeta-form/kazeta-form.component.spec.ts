import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KazetaFormComponent } from './kazeta-form.component';

describe('KazetaFormComponent', () => {
  let component: KazetaFormComponent;
  let fixture: ComponentFixture<KazetaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KazetaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KazetaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
