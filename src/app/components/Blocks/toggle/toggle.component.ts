import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'toggle-block',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  @Input() tooltip: string | undefined;
  @Input() formGroup!: FormGroup;
  @Input() formControlGround!: FormControl;
  @Input() _formControl!: string;

  @Input() addInput: boolean = false;
  @Input() _formControlForInput!: string;
  @Input() disableInput: boolean = false;

  @Output() toggleStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();


  @ViewChild('field', { static: false }) field!: ElementRef;

  ngOnInit() {
    console.log("We ran on init")
    this.formControlGround.valueChanges.subscribe((newValue: boolean) => {
      console.log("Trasmitting event now.");
      this.toggleStateChanged.emit(newValue);
      console.log("Event transmitted and state of toggle changed.");
    });
  }

  // ngOnChanges() {
  //   //Get the #field input element
  //   // const field = document.getElementById('field');
  //   console.log(this.field.nativeElement);
  //   (this.field.nativeElement as HTMLInputElement).select();
  //   (this.field.nativeElement as HTMLInputElement).blur();
  // }
}
