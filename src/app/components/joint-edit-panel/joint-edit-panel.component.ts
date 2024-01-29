import {Component, OnInit} from '@angular/core'
import {StateService} from "../../services/state.service";
import {InteractionService} from "../../services/interaction.service";
import {JointInteractor} from "../../interactions/joint-interactor"
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
  jointGroundedFormControl: FormControl = new FormControl()

  getCurrentJoint(){
    let currentJointInteractor = this.interactorService.getSelectedObject();
    return (currentJointInteractor as JointInteractor).getJoint();
  }

  getJointName(): string {
    return this.getCurrentJoint().name + "<- here is the name of the joint";
  }
  setJointName(newName: string){
    this.getCurrentJoint().name = newName;
  }

  groundJoint(){
    this.getCurrentJoint().addGround();
    console.log("Ground added");
  }
  ungroundJoint(){
    this.getCurrentJoint().removeGround();
    console.log("Ground removed");

  }

  // Get X Coord and Y Coord return a FormControl Object. This is the kind of
  // object required to pass into the Dual Input Block. Don't be fooled when you
  // look into dual input block and it says "String"- it's lying to you, and if
  // you don't give it a FormControl the values will not display.
  getJointXCoord(): FormControl {
    this.jointXFormControl.setValue(this.getCurrentJoint().coords.x)
    return this.jointXFormControl;
  }
  getJointYCoord(): FormControl {
    this.jointYFormControl.setValue(this.getCurrentJoint().coords.y)
    return this.jointYFormControl;
  }
  setJointXCoord(xCoordInput: FormControl): void {

  }
  setJointYCoord(yCoordInput: FormControl): void {

  }

  handleToggleStateChange(stateChange: boolean) {
    console.log("Toggle State Changed: ", stateChange);
    const currentJoint = this.getCurrentJoint();
    if (stateChange) {
      currentJoint.addGround();
      this.jointGroundedFormControl.setValue(true);
    }
    else {currentJoint.removeGround();
    this.jointGroundedFormControl.setValue(false);
    }
    console.log(this.getCurrentJoint().isGrounded);
  }

  getJointColor(){

  }
  setJointColor(){

  }


}
