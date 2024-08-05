import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPanelComponent } from './open-panel.component';

describe('OpenPanelComponent', () => {
  let component: OpenPanelComponent;
  let fixture: ComponentFixture<OpenPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
