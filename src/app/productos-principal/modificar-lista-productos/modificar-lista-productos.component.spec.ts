import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarListaProductosComponent } from './modificar-lista-productos.component';

describe('ModificarListaProductosComponent', () => {
  let component: ModificarListaProductosComponent;
  let fixture: ComponentFixture<ModificarListaProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarListaProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarListaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
