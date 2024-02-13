import {Component} from '@angular/core'
import {StateService} from "../../services/state.service";
import {InteractionService} from "../../services/interaction.service";
import {Mechanism} from "../../model/mechanism";
import {LinkInteractor} from "../../interactions/link-interactor";

interface Tab {
    selected: boolean,
    label: string,
    icon: string
}
@Component({
    selector: 'app-link-analysis-panel',
    templateUrl: './link-analysis-panel.component.html',
    styleUrls: ['./link-analysis-panel.component.scss'],

})

export class LinkAnalysisPanelComponent {

    graphData: number[] = [10, 20, 15, 25, 30];

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
  getCurrentLink(){
    let currentLinkInteractor = this.interactorService.getSelectedObject();
    return (currentLinkInteractor as LinkInteractor).getLink();
  }
  getLinkName(): string {return this.getCurrentLink().name;}
    getReferenceJoint(){return this.getCurrentLink().joints.get(0);}
    getReferenceJointName(){return this.getReferenceJoint()?.name;}
    getReferenceJointXCoord(){return this.getReferenceJoint()?.coords.x.toFixed(3) as unknown as number;}
    getReferenceJointYCoord(){return this.getReferenceJoint()?.coords.y.toFixed(3) as unknown as number;}



    // get x coord and y coord return the number of the center of mass
  getCOMXCoord(): number {return this.getCurrentLink()?.centerOfMass.x.toFixed(3) as unknown as number;}
    getCOMYCoord(): number {return this.getCurrentLink()?.centerOfMass.y.toFixed(3) as unknown as number;}


  setJointXCoord(xCoordInput: number): void {this.getMechanism().setXCoord(this.getCurrentLink().id, xCoordInput);}
  setJointYCoord(yCoordInput: number): void {this.getMechanism().setYCoord(this.getCurrentLink().id, yCoordInput);}


    getPositionData(): any[] {
      return [{data: [10, 7, 3, 4, 8], label: ["X Position of Joint"]},
          {data: [8,7,6,5,4], label: ["Y Position of Joint"]}];
    }
    getVelocityData(): any[] {
      let mechanism = this.getMechanism()
        return [{data: [24,8,16,3,10], label: ["Velocity of Joint"]}];
    }
    getAccelerationData(): any[] {
        return [{data: [0,0,0,0,0], label: ["Acceleration of Joint"]}];
    }
    getJointTimeData(): string[]{
      return ["1", "2", "3", "4", "5"]
    }

  // geteLinksForJoint and getConnectedJoints are both used to dynamically
  // view and modify the connected joints in a mechanism. Is sent to a loop of
  // dual input blocks in the HTML, that's created by looping through all of the
  // connected joints
    /*
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

     */

}
