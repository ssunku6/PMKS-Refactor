import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCompLineComponent } from './create-new-comp-line.component';

describe('CreateNewCompLineComponent', () => {
  let component: CreateNewCompLineComponent;
  let fixture: ComponentFixture<CreateNewCompLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewCompLineComponent]
    });
    fixture = TestBed.createComponent(CreateNewCompLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
