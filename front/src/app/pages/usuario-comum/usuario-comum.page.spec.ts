import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioComumPage } from './usuario-comum.page';

describe('UsuarioComumPage', () => {
  let component: UsuarioComumPage;
  let fixture: ComponentFixture<UsuarioComumPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioComumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
