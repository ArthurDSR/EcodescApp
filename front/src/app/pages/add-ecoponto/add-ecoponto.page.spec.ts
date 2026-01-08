import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEcopontoPage } from './add-ecoponto.page';

describe('AddEcopontoPage', () => {
  let component: AddEcopontoPage;
  let fixture: ComponentFixture<AddEcopontoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEcopontoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
