import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Link} from "../../../model/link";


@Component({
  selector: 'dual-button',
  templateUrl: './dual-button.component.html',
  styleUrls: ['./dual-button.component.scss'],
})
export class DualButtonComponent {
  @Input() Link!: Link;
  @Input() btn1Disabled: boolean = false;
  @Input() btn2Disabled: boolean = false;
  @Input() btn1Text: string = '';
  @Input() btn2Text: string = '';
  @Input() btn1Icon: string = '';
  @Input() btn2Icon: string = '';
  @Input() btn1Action!: () => void;
  @Input() btn2Action!: () => void;
  @Input() btn1SVGPath: string = '';
  @Input() btn2SVGPath: string = '';

/*
  <mat-icon svgIcon='unweld_joint'></mat-icon>
  <mat-icon [svgIcon]=btn3Icon></mat-icon>
    <mat-icon svgIcon='weld_joint'></mat-icon>
*/
  
  constructor() {}
}
