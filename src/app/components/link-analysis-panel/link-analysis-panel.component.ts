import {Component} from '@angular/core'
import {StateService} from "../../services/state.service";
import {InteractionService} from "../../services/interaction.service";
import {Mechanism} from "../../model/mechanism";
import {LinkInteractor} from "../../interactions/link-interactor";
import {KinematicSolverService} from "../../services/kinematic-solver.service";
import {Joint} from "../../model/joint";

interface Tab {
    selected: boolean,
    label: string,
    icon: string
}

// enum contains every kind of graph this panel can open.
export enum GraphType {
  CoMPosition,
  CoMVelocity,
  CoMAcceleration,
  // Add more graph types as needed
}

@Component({
    selector: 'app-link-analysis-panel',
    templateUrl: './link-analysis-panel.component.html',
    styleUrls: ['./link-analysis-panel.component.scss'],

})

export class LinkAnalysisPanelComponent {

  currentGraphType: GraphType | null = null;
  graphTypes = GraphType; // Make the enum accessible in the template

  graphExpanded: { [key: string]: boolean } = {
    dataSummary: true,
    graphicalAnalysis: false,
    positionOfJoint: false,
      velocityOfJoint: false,
      accelerationOfJoint: false
  };

  constructor(private stateService: StateService, private interactorService: InteractionService, private kinematicSolverService: KinematicSolverService){
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

  openAnalysisGraph(graphType: GraphType): void {
    this.currentGraphType = graphType;
    if(this.currentGraphType == GraphType.CoMPosition){
      this.addPlaceholderCoMJoint();
    }
    //this.getGraphData();
  }

  closeAnalysisGraph() {
    if(this.currentGraphType == GraphType.CoMPosition) {
      this.removePlaceholderCoMJoint();
    }

    this.currentGraphType = null;
  }

  getGraphTypes(){
    // @ts-ignore
    return Object.keys(this.graphTypes).filter(key => !isNaN(Number(this.graphTypes[key]))).map(key => Number(this.graphTypes[key])) as GraphType[];
  }

  getGraphTypeName(graphType: GraphType): string {
    switch (graphType) {
      case GraphType.CoMPosition:
        return 'Center of Mass Position';
      case GraphType.CoMVelocity:
        return 'Center of Mass Velocity';
      case GraphType.CoMAcceleration:
        return 'Center of Mass Acceleration';
      // Add more cases as needed
      default:
        return ''; // Handle unknown cases or add a default value
    }
  }

  addPlaceholderCoMJoint(): void{
    let CoM = this.getCurrentLink().centerOfMass;
    let linkID = this.getCurrentLink().id;
    this.getMechanism().addJointToLink(linkID, CoM);
  }

  removePlaceholderCoMJoint(): void {
    this.getMechanism().removeJoint(this.getPlaceholderCoMJoint().id);
  }

  getPlaceholderCoMJoint(): Joint {
    const joints = this.getCurrentLink().joints;

    let maxJoint: Joint;
    let maxID = Number.MIN_SAFE_INTEGER;

    for (const [jointID, joint] of joints.entries()) {
      if (jointID > maxID) {
        maxID = jointID;
        maxJoint = joint;
      }
    }

    // @ts-ignore
    console.log("Here is the com placeholder joint: " + maxJoint.id);
    // @ts-ignore
    return maxJoint;
}

  getGraphData() {
    switch(this.currentGraphType) {
      case GraphType.CoMPosition:
        let placeholderCoMJoint = this.getPlaceholderCoMJoint();
        const animationPositions = this.kinematicSolverService.solvePositions();
        let chartData = this.kinematicSolverService.transformPositionsForChart(animationPositions, placeholderCoMJoint);
        return chartData;

      case GraphType.CoMVelocity:
      // do at a later date, bozo TODO

      case GraphType.CoMAcceleration:
      // TODO more bozo behavior

      default:
        return {
          xData: [],
          yData: [],
          timeLabels: []
        };
    }
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
