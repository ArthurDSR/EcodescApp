import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcopontoPage } from './ecoponto.page';

describe('EcopontoPage', () => {
  let component: EcopontoPage;
  let fixture: ComponentFixture<EcopontoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EcopontoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
