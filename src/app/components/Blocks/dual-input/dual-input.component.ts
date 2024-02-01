import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import {Form, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Joint} from "../../../model/joint";

@Component({
  selector: 'dual-input-block',
  templateUrl: './dual-input.component.html',
  styleUrls: ['./dual-input.component.scss'],
})
export class DualInputComponent {
  @Input() disabled: boolean=false;
  @Input() tooltip: string = '';
  @Input() input1Value: number=0;
  @Input() input2Value: number = 0;
  @Input() label1: string ="X";
  @Input() label2: string ="Y";

  @Output() input1Change: EventEmitter<number> = new EventEmitter<number>();
  @Output() input2Change: EventEmitter<number> = new EventEmitter<number>();

  // handle the enter key being pressed and updating the values of the input blocks
  onEnterKeyInput1() {this.input1Change.emit(this.input1Value);}
  onEnterKeyInput2() {this.input2Change.emit(this.input2Value);}

  onBlurInput1() {this.input1Change.emit(this.input1Value);}
  onBlurInput2() {this.input2Change.emit(this.input2Value);}

  /*
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


  <div id='dual-input-block' style='{{disabled ? "cursor: default" : ""}}'>

  <div class='row'>
    <span class='label {{disabled ? "disabled" : ""}}'><ng-content></ng-content></span>
    <mat-icon matTooltip='{{ this.tooltip }}' [matTooltipShowDelay]='1000' class='label-help'
              [matTooltipDisabled]='disabled'
    >help_outline
    </mat-icon>
    <div class='spacer'></div>
  </div>

  <div class='row' [formGroup]='formGroup' style='gap: 5px'>
    <!--
    <ng-container *ngIf='formSubGroup'>
      <span class='label {{disabled ? "disabled" : ""}}'>{{label1}}</span>
      <mat-form-field class='customInputForm'
                      formGroupName='{{formSubGroup}}'
                      (click)='field1.select()'
                      (mouseenter)='isField1MouseOver = true; updateOverlay()'
                      (mouseleave)='isField1MouseOver = false; updateOverlay()'
                      (focusin)='isField1Focused = true; updateOverlay()'
                      (focusout)='isField1Focused = false; updateOverlay()'>
        <input class='customInput' matInput type='text' #field1
               (keyup.enter)='field1.blur()'
               [formControl]=this.field1Control>
      </mat-form-field>

      <div class='spacer'></div>
      <span class='label {{disabled ? "disabled" : ""}}'
            style='{{label2 === "⊾" ? "font-size: 25px; padding-bottom: 5px" : ""}}'>{{label2}}</span>
      <mat-form-field class='customInputForm'
                      formGroupName='{{formSubGroup}}'
                      (click)='field2.select()'
                      (mouseenter)='isField2MouseOver = true; updateOverlay()'
                      (mouseleave)='isField2MouseOver = false; updateOverlay()'
                      (focusin)='isField2Focused = true; updateOverlay()'
                      (focusout)='isField2Focused = false; updateOverlay()'>
        <input class='customInput' matInput type='text' #field2
               (keyup.enter)='field2.blur()'
               [formControl]='this.field2Control'>
      </mat-form-field>
    </ng-container>
  -->
    <ng-container *ngIf='!formSubGroup'>
      <span class='label {{disabled ? "disabled" : ""}}'>{{label1}}</span>
      <mat-form-field class='customInputForm'
                      (click)='field1.select()'
                      (mouseenter)='isField1MouseOver = true; updateOverlay()'
                      (mouseleave)='isField1MouseOver = false; updateOverlay()'
                      (focusin)='isField1Focused = true; updateOverlay()'
                      (focusout)='isField1Focused = false; updateOverlay()'>
        <input class='customInput' matInput type='text' #field1
               (keyup.enter)='field1.blur()'
               [formControl]='this.formControl1'>
      </mat-form-field>

      <div class='spacer'></div>
      <span class='label {{disabled ? "disabled" : ""}}'
            style='{{label2 === "⊾" ? "font-size: 25px; padding-bottom: 5px" : ""}}'>{{label2}}</span>
      <mat-form-field class='customInputForm' (click)='field2.select()'
                      (mouseenter)='isField2MouseOver = true; updateOverlay()'
                      (mouseleave)='isField2MouseOver = false; updateOverlay()'
                      (focusin)='isField2Focused = true; updateOverlay()'
                      (focusout)='isField2Focused = false; updateOverlay()'>
        <input class='customInput' matInput type='text' #field2
               (keyup.enter)='field2.blur()'
               [formControl]='this.formControl2'>
      </mat-form-field>
    </ng-container>

  </div>
</div>


.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

#dual-input-block {

  .disabled {
    opacity: 0.5;
  }

  .customInputForm {
    .customInput {
      //@include mat.typography-level($typography-config, 'body-2');
    }

    .mat-mdc-form-field-subscript-wrapper {
      display: none;
    }

    .mat-mdc-form-field-infix {
      padding: 6px 0;
    }

    .mdc-text-field--filled:not(.mdc-text-field--disabled) {
      //background-color: #eff1f8;
      background-color: #f0f1f5;
    }

    .mat-mdc-text-field-wrapper {
      height: 30px;
      width: 80px;
      padding: 0 6px;
    }
  }

}

   */
}
