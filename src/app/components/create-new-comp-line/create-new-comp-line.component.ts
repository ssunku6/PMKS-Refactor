import { Component, Input } from '@angular/core';
import { Coord } from 'src/app/model/coord';

@Component({
  selector: '[app-create-new-comp-line]',
  templateUrl: './create-new-comp-line.component.html',
  styleUrls: ['./create-new-comp-line.component.css']
})
export class CreateNewCompLineComponent {
@Input() start!: Coord;
@Input() end!: Coord;

}
