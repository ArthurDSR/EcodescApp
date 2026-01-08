import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EDescartePage } from './e-descarte.page';

describe('EDescartePage', () => {
  let component: EDescartePage;
  let fixture: ComponentFixture<EDescartePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EDescartePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
