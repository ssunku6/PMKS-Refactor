import { Coord } from "../model/coord";
import { Joint, JointType } from "../model/joint";
import { Mechanism } from "../model/mechanism";
import { InteractionService } from "../services/interaction.service";
import { StateService } from "../services/state.service";
import { ClickCapture, ClickCaptureID } from "./click-capture";
import { CreateLinkFromJointCapture } from "./create-link-from-joint-capture";
import { ContextMenuOption, Interactor } from "./interactor";
import { UnitConversionService } from "../services/unit-conversion.service";

/*
This interactor defines the following behaviors:
- Dragging the joint moves it
*/

export class JointInteractor extends Interactor {


    constructor(public joint: Joint, private stateService: StateService,
        private interactionService: InteractionService, private unitConversionService: UnitConversionService) {
        super(true, true);

        this.onDragStart$.subscribe((event) => {
        });

        this.onDrag$.subscribe((event) => {
            let convertedOffset: Coord = this.unitConversionService.mouseDeltaToModelDelta(this.dragOffset!);
            this.joint.setCoordinates(this.joint._coords.add(convertedOffset));
        });

        this.onDragEnd$.subscribe((event) => {
        });

        // if backspace, delete
        this.onKeyDown$.subscribe((event) => {
            if (event.key === "Backspace") {
                this.stateService.getMechanism().removeJoint(this.joint.id);
            }
        });

    }
    

    /**
     * Determines what options should be shown for the context menu when right clicking on a joint
     * 
     * @returns 
     */
    public override specifyContextMenu(): ContextMenuOption[] {

        let availableContext: ContextMenuOption[] = [];
        let mechanism: Mechanism = this.stateService.getMechanism();
        
        availableContext.push(
            {
                label: "Attach Link",
                action: () => {this.enterAddLinkCaptureMode()},
                disabled: false
            });
            //logic for Input option
            if(this.joint.isInput){
                availableContext.push(
                    {
                        label: "Remove Input",
                        action: () => {mechanism.removeInput(this.joint.id)},
                        disabled: !mechanism.canRemoveInput(this.joint)
                    });
            }else{
                availableContext.push(
                    {
                        label: "Add Input",
                        action: () => {mechanism.addInput(this.joint.id)},
                        disabled: !mechanism.canAddInput(this.joint)
                    });
            }
            //Logic for Grounding option
            if(this.joint.isGrounded){
                availableContext.push(
                    {
                        label: "Remove Ground",
                        action: () => {mechanism.removeGround(this.joint.id)},
                        disabled: !mechanism.canRemoveGround(this.joint)
                    });
            }else{
                availableContext.push(
                    {
                        label: "Add Ground",
                        action: () => {mechanism.addGround(this.joint.id)},
                        disabled: !mechanism.canAddGround(this.joint)
                    });
            }
            //Logic for Slider option
            if(this.joint.type == JointType.Prismatic){
                availableContext.push(
                    {
                        label: "Remove Slider",
                        action: () => {mechanism.removeSlider(this.joint.id)},
                        disabled: !mechanism.canRemoveSlider(this.joint)
                    });
            }else{
                availableContext.push(
                    {
                        label: "Add Slider",
                        action: () => {mechanism.addSlider(this.joint.id)},
                        disabled: !mechanism.canAddSlider(this.joint)
                    });
            }
            //Logic for Welding option
            if(this.joint.isWelded){
                availableContext.push(
                    {
                        label: "Remove Weld",
                        action: () => {mechanism.removeWeld(this.joint.id)},
                        disabled: !mechanism.canRemoveWeld(this.joint)
                    });
            }else{
                availableContext.push(
                    {
                        label: "Add Weld",
                        action: () => {mechanism.addWeld(this.joint.id)},
                        disabled: !mechanism.canAddWeld(this.joint)
                    });
            }
            availableContext.push(
                {
                    label: "Delete Joint",
                    action: () => {mechanism.removeJoint(this.joint.id)},
                    disabled: false
                });
        return availableContext;
        
    }
    
    private enterAddLinkCaptureMode(): void {
        const capture = new CreateLinkFromJointCapture(this.joint, this.interactionService);
        capture.onClick$.subscribe((mousePos) => {
            let convertedMousePos = this.unitConversionService.mouseCoordToModelCoord(mousePos);
            if (capture.getHoveringJoint() === undefined) { // if not hovering over a joint, create a new joint to attach to
                this.stateService.getMechanism().addLinkToJoint(this.joint.id, convertedMousePos);
            } else { // if hovering over a joint, create a link to that joint
                this.stateService.getMechanism().addLinkToJoint(this.joint.id, capture.getHoveringJoint()!.id);
            }
        });
        this.interactionService.enterClickCapture(capture);
    }

    public override toString(): string {
        return "jointInteractor(" + this.joint.name + ")";
    }

}