import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliacaoEmpresaPage } from './avaliacao-empresa.page';

describe('AvaliacaoEmpresaPage', () => {
  let component: AvaliacaoEmpresaPage;
  let fixture: ComponentFixture<AvaliacaoEmpresaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoEmpresaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
