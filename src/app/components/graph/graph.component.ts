import { Component } from '@angular/core';
import { ClickCapture, ClickCaptureID } from 'src/app/interactions/click-capture';
import { CreateLinkFromGridCapture } from 'src/app/interactions/create-link-from-grid-capture';
import { CreateLinkFromJointCapture } from 'src/app/interactions/create-link-from-joint-capture';
import { CreateLinkFromLinkCapture } from 'src/app/interactions/create-link-from-link-capture';
import { CreateForceFromLinkCapture } from 'src/app/interactions/create-force-from-link-capture';
import { Coord } from 'src/app/model/coord';
import { Link } from 'src/app/model/link';
import { Joint } from 'src/app/model/joint';
import { Force } from 'src/app/model/force';
import { CompoundLink } from 'src/app/model/compound-link';
import { Mechanism } from 'src/app/model/mechanism';
import { InteractionService } from 'src/app/services/interaction.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: '[app-graph]',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {

  constructor(public stateService: StateService, private interactorService: InteractionService) {
    console.log("GraphComponent.constructor");
  }

  public getJoints(): IterableIterator<Joint> {
    return this.stateService.getMechanism().getJoints();
  }

  public getLinks(): IterableIterator<Link> {
    return this.stateService.getMechanism().getIndependentLinks();
  }
  public getCompoundLinks(): IterableIterator<CompoundLink> {
    return this.stateService.getMechanism().getCompoundLinks();
  }
  public getForces(): IterableIterator<Force> {
    return this.stateService.getMechanism().getForces();
  }
//
public isCreatingComponent(): boolean{
  return this.interactorService.getClickCaptureID() !== undefined;
}




  public isCreateNewLinkFromGrid(): boolean {
    return this.interactorService.getClickCaptureID() === ClickCaptureID.CREATE_LINK_FROM_GRID;
  }
  public isCreateNewLinkFromJoint(): boolean {
    return this.interactorService.getClickCaptureID() === ClickCaptureID.CREATE_LINK_FROM_JOINT;
  }
  public isCreateNewLinkFromLink(): boolean {
    return this.interactorService.getClickCaptureID() === ClickCaptureID.CREATE_LINK_FROM_LINK;
  }
  public isCreateNewForceFromLink(): boolean {
    return this.interactorService.getClickCaptureID() === ClickCaptureID.CREATE_FORCE_FROM_LINK;
  }

  public getNewCompLineStart(): Coord {
    let capture = this.interactorService.getClickCapture()!;
    return capture.getStartPos();
  }

  public getNewCompLineEnd(): Coord {
    return this.interactorService.getMousePos();
  }
}
