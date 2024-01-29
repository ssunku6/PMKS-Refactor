import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import {Form, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Joint} from "../../../model/joint";

@Component({
  selector: 'dual-input-block',
  templateUrl: './dual-input.component.html',
  styleUrls: ['./dual-input.component.scss'],
})
export class DualInputComponent {
  @Input() currentJoint!: Joint;
  @Input() tooltip!: string;
  @Input() unit!: string;
  @Input() label1: string = 'X';
  @Input() label2: string = 'Y';
  @Input() formGroup!: FormGroup;
  @Input() formSubGroup: string | undefined;
  @Input() formControl1!: FormControl;
  @Input() formControl2!: FormControl;
  @Input() disabled: boolean = false;
  @Output() field1Entry: EventEmitter<number> = new EventEmitter();
  @Output() field2Entry: EventEmitter<number> = new EventEmitter();
  @Input() emitterOutputID: number = 1;

  isField1MouseOver: boolean = false;
  isField1Focused: boolean = false;
  showField1Overlay: boolean = false;
  lastShowField1Overlay: boolean = false;

  isField2MouseOver: boolean = false;
  isField2Focused: boolean = false;
  showField2Overlay: boolean = false;
  lastShowField2Overlay: boolean = false;


  form: FormGroup = new FormGroup({
    inputValue: new FormControl(0), // Initialize with default value
  });

  ngOnInit() {
    //console.log("Dual input block init went and we did it");

    // Subscribe to changes and update the original form controls
    this.formControl1.valueChanges.subscribe((value) => {
      //console.log("X value changed ", value);
      //this.formControl1.setValue(value);
    });

    this.formControl2.valueChanges.subscribe((value) => {
      //console.log("Y value changed ", value);
      //this.formControl2.setValue(value);
    });
  }

  updateOverlay() {
    if (this.disabled) {
      this.showField1Overlay = false;
      this.showField2Overlay = false;
      return;
    }

    this.showField1Overlay = this.isField1MouseOver || this.isField1Focused;
    if (this.lastShowField1Overlay != this.showField1Overlay) {
      if (this.showField1Overlay) {
        this.field1Entry.emit(this.emitterOutputID);
      } else {
        this.field1Entry.emit(-2);
      }
    }
    this.lastShowField1Overlay = this.showField1Overlay;

    this.showField2Overlay = this.isField2MouseOver || this.isField2Focused;
    if (this.lastShowField2Overlay != this.showField2Overlay) {
      if (this.showField2Overlay) {
        this.field2Entry.emit(this.emitterOutputID);
      } else {
        this.field2Entry.emit(-2);
      }
    }
    this.lastShowField2Overlay = this.showField2Overlay;
  }

  constructor() {}
}
