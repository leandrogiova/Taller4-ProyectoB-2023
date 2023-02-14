import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasPrincipalComponent } from './mesas-principal.component';

describe('MesasPrincipalComponent', () => {
  let component: MesasPrincipalComponent;
  let fixture: ComponentFixture<MesasPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesasPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesasPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
