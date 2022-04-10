import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCommandeLivreComponent } from './liste-commande-livre.component';

describe('ListeCommandeLivreComponent', () => {
  let component: ListeCommandeLivreComponent;
  let fixture: ComponentFixture<ListeCommandeLivreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCommandeLivreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCommandeLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
