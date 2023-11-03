import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractInteractiveComponent } from './abstract-interactive.component';

describe('AbstractInteractiveComponent', () => {
  let component: AbstractInteractiveComponent;
  let fixture: ComponentFixture<AbstractInteractiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbstractInteractiveComponent]
    });
    fixture = TestBed.createComponent(AbstractInteractiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
