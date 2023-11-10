import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointComponent } from './joint.component';

describe('JointComponent', () => {
  let component: JointComponent;
  let fixture: ComponentFixture<JointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JointComponent]
    });
    fixture = TestBed.createComponent(JointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
