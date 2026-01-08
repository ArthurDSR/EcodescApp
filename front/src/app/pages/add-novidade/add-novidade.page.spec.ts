import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNovidadePage } from './add-novidade.page';

describe('AddNovidadePage', () => {
  let component: AddNovidadePage;
  let fixture: ComponentFixture<AddNovidadePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNovidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
