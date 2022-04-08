import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRestoComponent } from './liste-resto.component';

describe('ListeRestoComponent', () => {
  let component: ListeRestoComponent;
  let fixture: ComponentFixture<ListeRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeRestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
