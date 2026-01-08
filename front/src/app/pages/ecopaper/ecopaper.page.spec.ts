import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EcopaperPage } from './ecopaper.page';

describe('EcopaperPage', () => {
  let component: EcopaperPage;
  let fixture: ComponentFixture<EcopaperPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EcopaperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
