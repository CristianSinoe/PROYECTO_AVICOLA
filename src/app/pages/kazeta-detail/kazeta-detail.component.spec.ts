import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KazetaDetailComponent } from './kazeta-detail.component';


describe('KazetaDetailComponent', () => {
  let component: KazetaDetailComponent;
  let fixture: ComponentFixture<KazetaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KazetaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KazetaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
