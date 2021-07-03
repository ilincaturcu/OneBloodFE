import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstoricProgramariComponent } from './istoric-programari.component';

describe('IstoricProgramariComponent', () => {
  let component: IstoricProgramariComponent;
  let fixture: ComponentFixture<IstoricProgramariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IstoricProgramariComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IstoricProgramariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
