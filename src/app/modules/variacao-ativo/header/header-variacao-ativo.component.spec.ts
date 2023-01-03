import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderVariacaoAtivoComponent } from './header-variacao-ativo.component';

describe('HeaderVariacaoAtivoComponent', () => {
  let component: HeaderVariacaoAtivoComponent;
  let fixture: ComponentFixture<HeaderVariacaoAtivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderVariacaoAtivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderVariacaoAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
