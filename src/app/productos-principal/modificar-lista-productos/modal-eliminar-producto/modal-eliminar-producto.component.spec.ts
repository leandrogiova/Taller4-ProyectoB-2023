import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarProductoComponent } from './modal-eliminar-producto.component';

describe('ModalEliminarProductoComponent', () => {
  let component: ModalEliminarProductoComponent;
  let fixture: ComponentFixture<ModalEliminarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEliminarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
