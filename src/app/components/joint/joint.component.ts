import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Joint } from 'src/app/model/joint';
import { AbstractInteractiveComponent } from '../abstract-interactive/abstract-interactive.component';
import { Interactor } from 'src/app/interactions/interactor';
import { JointInteractor } from 'src/app/interactions/joint-interactor';
import { StateService } from 'src/app/services/state.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ClickCapture, ClickCaptureID } from 'src/app/interactions/click-capture';
import { CreateLinkFromJointCapture } from 'src/app/interactions/create-link-from-joint-capture';


@Component({
  selector: '[app-joint]',
  templateUrl: './joint.component.html',
  styleUrls: ['./joint.component.css']
})
export class JointComponent extends AbstractInteractiveComponent {

  @Input() joint!: Joint;

  constructor(public override interactionService: InteractionService,
    private stateService: StateService) {
    super(interactionService);
  }

  override registerInteractor(): Interactor {
    return new JointInteractor(this.joint, this.stateService, this.interactionService);
  }

  public getX(): number {
    return this.joint!.coords.x;
  }

  public getY(): number {
    return this.joint!.coords.y;
  }

  public getRadius(): number {
    return 10;
  }

  public getColor(): string {
    return '#ffecb2';
  }

  public getStrokeWidth(): number {
    if (this.isCreateLinkCaptureAndHoveringOverThisJoint()) {
      return 6;
    } else if (this.getInteractor().isSelected) {
      return 4;
    }
    return 1;
  }

  // whether in create link click capture mode, and the mouse is hovering over this joint
  public isCreateLinkCaptureAndHoveringOverThisJoint(): boolean {
    if (this.interactionService.getClickCaptureID() === ClickCaptureID.CREATE_LINK_FROM_JOINT) {
      let capture = this.interactionService.getClickCapture() as CreateLinkFromJointCapture;
      return capture.getHoveringJoint() === this.joint;
    }
    return false;
  }
}
