import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizeDonatorComponent } from './analize-donator.component';

describe('AnalizeDonatorComponent', () => {
  let component: AnalizeDonatorComponent;
  let fixture: ComponentFixture<AnalizeDonatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalizeDonatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalizeDonatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
