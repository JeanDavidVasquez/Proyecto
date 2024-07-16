import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contenido2Component } from './contenido2.component';

describe('Contenido2Component', () => {
  let component: Contenido2Component;
  let fixture: ComponentFixture<Contenido2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Contenido2Component]
    });
    fixture = TestBed.createComponent(Contenido2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
