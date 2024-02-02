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
    selector: 'app-joint-analysis-panel',
    templateUrl: './joint-analysis-panel.component.html',
    styleUrls: ['./joint-analysis-panel.component.scss'],

})

export class JointAnalysisPanelComponent {

  graphExpanded: { [key: string]: boolean } = {
    dataSummary: true,
    graphicalAnalysis: false,
    positionOfJoint: false,
      velocityOfJoint: false,
      accelerationOfJoint: false
  };

  constructor(private stateService: StateService, private interactorService: InteractionService){
      console.log("joint-analysis-panel.constructor");
  }

  getMechanism(): Mechanism {return this.stateService.getMechanism();}
  getCurrentJoint(){
    let currentJointInteractor = this.interactorService.getSelectedObject();
    return (currentJointInteractor as JointInteractor).getJoint();
  }
  getJointName(): string {return this.getCurrentJoint().name;}

  // get x coord and y coord return the number of the currently selected coord
  getJointXCoord(): number {return this.getCurrentJoint().coords.x.toFixed(3) as unknown as number;}
  getJointYCoord(): number {return this.getCurrentJoint().coords.y.toFixed(3) as unknown as number;}
  setJointXCoord(xCoordInput: number): void {this.getMechanism().setXCoord(this.getCurrentJoint().id, xCoordInput);}
  setJointYCoord(yCoordInput: number): void {this.getMechanism().setYCoord(this.getCurrentJoint().id, yCoordInput);}

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
  /*
  onTitleBlockClick(event: MouseEvent): void {
    console.log('Title clicked!');
    const clickedElement = event.target as HTMLElement;
    // Check if the clicked element has the 'edit-svg' class, so we can enable editing
    if (clickedElement && clickedElement.classList.contains('edit-svg')) {
      console.log('Edit SVG clicked!');
      this.isEditingTitle = true;
    }
  }
   */
}
