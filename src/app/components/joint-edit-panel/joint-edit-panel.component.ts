import {Component, OnInit} from '@angular/core'
import {StateService} from "../../services/state.service";
import {InteractionService} from "../../services/interaction.service";
import {JointInteractor} from "../../interactions/joint-interactor"
import {Mechanism} from "../../model/mechanism";
import {Joint} from "../../model/joint";
import {Form, FormControl, FormGroup} from "@angular/forms";

interface Tab {
    selected: boolean,
    label: string,
    icon: string
}
@Component({
    selector: 'app-joint-edit-panel',
    templateUrl: './joint-edit-panel.component.html',
    styleUrls: ['./joint-edit-panel.component.scss'],

})

export class jointEditPanelComponent {

  graphExpanded: { [key: string]: boolean } = {
    basicBasic: false,
    basicVisual: false,
    advancedSettingsBasic: false,
    advancedSettingsVisual: false
  };

  constructor(private stateService: StateService, private interactorService: InteractionService){
    console.log("GraphComponent.constructor");

  }
  // These form control objects exist basically only to be passed in to the Dual Input Block component
  jointXFormControl: FormControl = new FormControl();
  jointYFormControl: FormControl = new FormControl();

  getMechanism(): Mechanism {
    return this.stateService.getMechanism();
  }
  getCurrentJoint(){
    let currentJointInteractor = this.interactorService.getSelectedObject();
    return (currentJointInteractor as JointInteractor).getJoint();
  }

  getJointName(): string {
    return this.getCurrentJoint().name;
  }
  setJointName(newName: string){
    this.getCurrentJoint().name = newName;
  }

  // Get X Coord and Y Coord return a FormControl Object. This is the kind of
  // object required to pass into the Dual Input Block. Don't be fooled when you
  // look into dual input block and it says "String"- it's lying to you, and if
  // you don't give it a FormControl the values will not display.
  getJointXCoord(): number {
    return this.getCurrentJoint().coords.x;
  }
  getJointYCoord(): number {
    return this.getCurrentJoint().coords.y;
  }
  setJointXCoord(xCoordInput: number): void {
    console.log("X coordinate updated ", xCoordInput);
    this.getMechanism().setXCoord(this.getCurrentJoint().id, xCoordInput);
  }
  setJointYCoord(yCoordInput: number): void {
    console.log("Y coordinate updated ", yCoordInput);
    this.getMechanism().setYCoord(this.getCurrentJoint().id, yCoordInput);
  }

  // handleToggleGroundChanged is used by the edit panel implementation of a toggle block
  // to accurately portray whether or not the toggle is selected for grounding.
  handleToggleGroundChange(stateChange: boolean) {
    console.log("Toggle State Changed: ", stateChange);
    const currentJoint = this.getCurrentJoint();
    if (stateChange) {
      this.getMechanism().addGround(this.getCurrentJoint().id);
    }
    else {this.getMechanism().removeGround(this.getCurrentJoint().id);}
  }

  // these values are passed into a tri button. these handle making and removing input.
  //        [btn1Disabled]="!getCurrentJoint().canAddInput() || getCurrentJoint().isInput"
  makeInput() {this.getMechanism().addInput(this.getCurrentJoint().id);}
  removeInput() {this.getMechanism().removeInput(this.getCurrentJoint().id);}
  makeInputClockwise() {console.log("We would be making the input clockwise here");}
  makeInputCounterClockwise() {console.log("We would be making the input counter clockwise here");}


  // these values are passed into a tri button. these handle the welding and unwelding
  // of the current joint
  weldJoint() {this.getMechanism().addWeld(this.getCurrentJoint().id);}
  unweldJoint(){this.getMechanism().removeWeld(this.getCurrentJoint().id);}

  getJointColor(){}
  setJointColor(){}

}
