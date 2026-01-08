import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovidadePage } from './novidade.page';

describe('NovidadePage', () => {
  let component: NovidadePage;
  let fixture: ComponentFixture<NovidadePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NovidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
