import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoProfilComponent } from './resto-profil.component';

describe('RestoProfilComponent', () => {
  let component: RestoProfilComponent;
  let fixture: ComponentFixture<RestoProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
