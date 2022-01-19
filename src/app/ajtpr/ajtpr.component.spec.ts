import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjtprComponent } from './ajtpr.component';

describe('AjtprComponent', () => {
  let component: AjtprComponent;
  let fixture: ComponentFixture<AjtprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjtprComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjtprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
