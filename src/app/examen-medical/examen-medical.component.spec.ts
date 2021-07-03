import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenMedicalComponent } from './examen-medical.component';

describe('ExamenMedicalComponent', () => {
  let component: ExamenMedicalComponent;
  let fixture: ComponentFixture<ExamenMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenMedicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
