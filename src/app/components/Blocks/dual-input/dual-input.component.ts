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

}
