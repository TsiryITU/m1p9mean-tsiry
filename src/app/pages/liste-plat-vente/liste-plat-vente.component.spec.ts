import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePlatVenteComponent } from './liste-plat-vente.component';

describe('ListePlatVenteComponent', () => {
  let component: ListePlatVenteComponent;
  let fixture: ComponentFixture<ListePlatVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePlatVenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePlatVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
