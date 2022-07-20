import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsnafSliderComponent } from './esnaf-slider.component';

describe('EsnafSliderComponent', () => {
  let component: EsnafSliderComponent;
  let fixture: ComponentFixture<EsnafSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsnafSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsnafSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
