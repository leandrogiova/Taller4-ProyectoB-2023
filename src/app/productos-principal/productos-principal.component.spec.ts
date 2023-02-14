import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosPrincipalComponent } from './productos-principal.component';

describe('ProductosPrincipalComponent', () => {
  let component: ProductosPrincipalComponent;
  let fixture: ComponentFixture<ProductosPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
