import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalResultsComponent } from './medical-results.component';

describe('MedicalResultsComponent', () => {
  let component: MedicalResultsComponent;
  let fixture: ComponentFixture<MedicalResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
