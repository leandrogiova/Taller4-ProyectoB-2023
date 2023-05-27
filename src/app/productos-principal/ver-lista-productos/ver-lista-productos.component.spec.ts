import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerListaProductosComponent } from './ver-lista-productos.component';

describe('VerListaProductosComponent', () => {
  let component: VerListaProductosComponent;
  let fixture: ComponentFixture<VerListaProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerListaProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerListaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
