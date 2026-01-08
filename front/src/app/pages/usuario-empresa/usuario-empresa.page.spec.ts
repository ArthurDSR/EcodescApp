import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioEmpresaPage } from './usuario-empresa.page';

describe('UsuarioEmpresaPage', () => {
  let component: UsuarioEmpresaPage;
  let fixture: ComponentFixture<UsuarioEmpresaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioEmpresaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
