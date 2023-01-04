import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VariacaoAtivoComponent } from '../variacao-ativo.component';


describe('VariacaoAtivoComponent', () => {
  let component: VariacaoAtivoComponent;
  let fixture: ComponentFixture<VariacaoAtivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariacaoAtivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariacaoAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
