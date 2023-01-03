import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsVariacaoAtivoComponent } from './tabs-variacao-ativo.component';

describe('TabsVariacaoAtivoComponent', () => {
  let component: TabsVariacaoAtivoComponent;
  let fixture: ComponentFixture<TabsVariacaoAtivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsVariacaoAtivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsVariacaoAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
