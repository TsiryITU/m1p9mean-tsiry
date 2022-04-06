import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatProfilComponent } from './plat-profil.component';

describe('PlatProfilComponent', () => {
  let component: PlatProfilComponent;
  let fixture: ComponentFixture<PlatProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
