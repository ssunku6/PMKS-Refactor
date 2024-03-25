import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Joint, JointType } from 'src/app/model/joint';
import { AbstractInteractiveComponent } from '../abstract-interactive/abstract-interactive.component';
import { Interactor } from 'src/app/interactions/interactor';
import { JointInteractor } from 'src/app/interactions/joint-interactor';
import { StateService } from 'src/app/services/state.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ClickCapture, ClickCaptureID } from 'src/app/interactions/click-capture';
import { CreateLinkFromJointCapture } from 'src/app/interactions/create-link-from-joint-capture';
import { UnitConversionService } from 'src/app/services/unit-conversion.service';

@Component({
  selector: '[app-joint]',
  templateUrl: './joint.component.html',
  styleUrls: ['./joint.component.css']
})
export class JointComponent extends AbstractInteractiveComponent {

  @Input() joint!: Joint;

  constructor(public override interactionService: InteractionService,
    private stateService: StateService,
    private unitConversionService: UnitConversionService) {
    super(interactionService);
  }

  override registerInteractor(): Interactor {
    return new JointInteractor(this.joint, this.stateService, this.interactionService);
  }

  public getX(): number {
    return this.unitConversionService.modelCoordToSVGCoord(this.joint._coords).x;
  }

  public getY(): number {
    return this.unitConversionService.modelCoordToSVGCoord(this.joint._coords).y;
  }

  public getRadius(): number {
    return 18;
  }

  public getColor(): string {
    if (this.getInteractor().isSelected) {
      return '#FFCA28'

    } else if(this.isHovered()){
      return '#FFECB3'
    }
    return '#FFF8E1';
  }

  getLocked():boolean {
    return this.joint.locked;
  }
  isWelded(){
    return this.joint.isWelded;
  }
  isGround(){
    return this.joint.isGrounded;
  }
  isInput(){
    return this.joint.isInput;
  }
  isPrismatic(){
    return this.joint.type == JointType.Prismatic;
  }
  isCCW(){
    return this.joint.inputSpeed >= 0;
  }

  getTranslation(): string{
    return "translate(" +
    this.unitConversionService.modelCoordToSVGCoord(this.joint._coords).x.toString() +
    " " +
    this.unitConversionService.modelCoordToSVGCoord(this.joint._coords).y.toString() +
    ") scale(0.6)";



  }

  public getStrokeWidth(): number {
    if (this.isCreateLinkCaptureAndHoveringOverThisJoint()) {
      return 2;
    }
    return 0;
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
