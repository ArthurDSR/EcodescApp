import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovidadeDetalhePage } from './novidade-detalhe.page';

describe('NovidadeDetalhePage', () => {
  let component: NovidadeDetalhePage;
  let fixture: ComponentFixture<NovidadeDetalhePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NovidadeDetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
