import {Component, OnInit} from '@angular/core'
import {StateService} from "../../services/state.service";
import {InteractionService} from "../../services/interaction.service";
import {JointInteractor} from "../../interactions/joint-interactor"
import {Mechanism} from "../../model/mechanism";
import {Joint} from "../../model/joint";
import {Form, FormControl, FormGroup} from "@angular/forms";
import {Link} from "../../model/link";

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
    basicBasic: true,
    basicVisual: false,
    advancedSettingsBasic: false,
    advancedSettingsVisual: false
  };
  isEditingTitle: boolean = false;

  constructor(private stateService: StateService, private interactorService: InteractionService){
    console.log("joint-edit-panel.constructor");

  }

  getMechanism(): Mechanism {return this.stateService.getMechanism();}
  getCurrentJoint(){
    let currentJointInteractor = this.interactorService.getSelectedObject();
    return (currentJointInteractor as JointInteractor).getJoint();
  }
  getJointName(): string {return this.getCurrentJoint().name;}
  onTitleBlockClick(event: MouseEvent): void {
    console.log('Title clicked!');
    const clickedElement = event.target as HTMLElement;
    // Check if the clicked element has the 'edit-svg' class, so we can enable editing
    if (clickedElement && clickedElement.classList.contains('edit-svg')) {
      console.log('Edit SVG clicked!');
      this.isEditingTitle = true;
    }
  }
  // TODO figure out where the joint names are displayed on screen and make it the name, not ID
  setJointName(newName: string){
    console.log("Here is the current name of the joint ", this.getCurrentJoint().name);
    this.getCurrentJoint().name = newName;
    console.log("Here is the new name of the joint ", this.getCurrentJoint().name);
    this.isEditingTitle=false;
  }
  deleteJoint(){
    this.getMechanism().removeJoint(this.getCurrentJoint().id);
  }

  // get x coord and y coord return the number of the currently selected coord
  // set x and y are used in conjunction with the dual input blocks. by using
  // the mechanism's built in setXCoord function, we are able to update with no
  // errors
  getJointXCoord(): number {return this.getCurrentJoint().coords.x.toFixed(4) as unknown as number;}
  getJointYCoord(): number {return this.getCurrentJoint().coords.y.toFixed(4) as unknown as number;}
  setJointXCoord(xCoordInput: number): void {this.getMechanism().setXCoord(this.getCurrentJoint().id, xCoordInput);}
  setJointYCoord(yCoordInput: number): void {this.getMechanism().setYCoord(this.getCurrentJoint().id, yCoordInput);}

  getJointLockState(): boolean {
    return this.getCurrentJoint().locked;
  }

  // geteLinksForJoint and getConnectedJoints are both used to dynamically
  // view and modify the connected joints in a mechanism. Is sent to a loop of
  // dual input blocks in the HTML, that's created by looping through all of the
  // connected joints
  getLinksForJoint(): IterableIterator<Link> {return this.getMechanism().getConnectedLinksForJoint(this.getCurrentJoint()).values();}
  getConnectedJoints(): Joint[] {
    const connectedLinks: Link[] = Array.from(this.getLinksForJoint());
    const allJoints: Joint[] = connectedLinks.reduce(
        (accumulator: Joint[], link: Link) => {
          const jointMap: Map<number, Joint> = link.joints;
          const joints: Joint[] = Array.from(jointMap.values());
          return accumulator.concat(joints);
        },
        []
    );
    // console.log(allJoints);
    return allJoints;
  }

  getJointDistance(otherJoint: Joint): number{
    let currentJoint = this.getCurrentJoint();
    let xDiff = otherJoint.coords.x - currentJoint.coords.x;
    let yDiff = otherJoint.coords.y - currentJoint.coords.y;

    let hypotenuse = (xDiff*xDiff) + (yDiff*yDiff);
    return Math.sqrt(hypotenuse);
  }

  getJointAngle(otherJoint: Joint): number{

    let currentJoint = this.getCurrentJoint();
    let xDiff = otherJoint.coords.x - currentJoint.coords.x;
    let yDiff = otherJoint.coords.y - currentJoint.coords.y;
    // Calculate the angle using arctangent
    const angleInRadians = Math.atan2(yDiff, xDiff);

    // Convert the angle to degrees
    let angleInDegrees = angleInRadians * (180 / Math.PI);

    // Ensure the angle is in the range of +180 to -180 degrees
    if (angleInDegrees > 180) {
      angleInDegrees -= 360;
    } else if (angleInDegrees < -180) {
      angleInDegrees += 360;
    }
    return angleInDegrees;
  }

  // Function utilized in conjunction with dual input blocks to change the angle of the current
  // joint (the first parameter) in relation to the second joint (the second parameter).
  // TODO does not currently work. need to account for several joints. is placeholder!
  changeJointAngle(jointIDReference: number, newAngle: number): void {
    console.log("changing angle from this joint ", jointIDReference, " to this angle ", newAngle);
    this.getMechanism().setAngleToJoint(this.getCurrentJoint().id, jointIDReference, newAngle);
  }
  // Function utilized in conjunction with dual input blocks to change the distance of the current
  // joint (the first parameter) in relation to the second joint (the second parameter).
  // TODO does not currently work. need to account for several joints. is placeholder!
  changeJointDistance(jointIDReference: number, newDistance: number): void {
    console.log("changing distance from this joint ", jointIDReference, " to this distance ", newDistance);
    this.getMechanism().setDistanceToJoint(this.getCurrentJoint().id, jointIDReference, newDistance);
  }

  // handleToggleGroundChanged is used by the edit panel implementation of a toggle block
  // to accurately portray whether or not the toggle is selected for grounding.
  handleToggleGroundChange(stateChange: boolean) {
    console.log("Toggle State Changed: ", stateChange);
    const currentJoint = this.getCurrentJoint();
    if (stateChange) {this.getMechanism().addGround(this.getCurrentJoint().id);}
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
