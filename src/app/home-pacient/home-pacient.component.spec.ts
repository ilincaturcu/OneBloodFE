import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePacientComponent } from './home-pacient.component';

describe('HomePacientComponent', () => {
  let component: HomePacientComponent;
  let fixture: ComponentFixture<HomePacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePacientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
