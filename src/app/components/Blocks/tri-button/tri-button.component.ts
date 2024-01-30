import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Joint} from "../../../model/joint";
import {Mechanism} from "../../../model/mechanism";

@Component({
  selector: 'tri-button',
  templateUrl: './tri-button.component.html',
  styleUrls: ['./tri-button.component.scss'],
})
export class TriButtonComponent {
  @Input() joint!: Joint;
  @Input() mechanism!: Mechanism;
  @Input() btn1Disabled: boolean = false;
  @Input() btn2Disabled: boolean = false;
  @Input() btn3Disabled: boolean = false;
  @Input() btn3Visible: boolean = false;
  @Input() btn1Text: string = '';
  @Input() btn2Text: string = '';
  @Input() btn3Text: string = '';
  @Input() btn3Icon: string = '';
  @Input() btn1Action!: () => void;
  @Input() btn2Action!: () => void;
  @Input() btn3Action!: () => void;

/*
  <mat-icon svgIcon='unweld_joint'></mat-icon>
  <mat-icon [svgIcon]=btn3Icon></mat-icon>
    <mat-icon svgIcon='weld_joint'></mat-icon>
*/

  getCurrentJoint(): Joint{
    return this.joint;
  }
  getMechanism(): Mechanism{
    return this.mechanism;
  }
  constructor() {}
}
