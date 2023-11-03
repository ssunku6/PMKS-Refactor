import { Coord } from "../model/coord";
import { Joint } from "../model/joint";
import { InteractionService } from "../services/interaction.service";
import { StateService } from "../services/state.service";
import { ClickCapture, ClickCaptureID } from "./click-capture";
import { CreateLinkFromJointCapture } from "./create-link-from-joint-capture";
import { ContextMenuOption, Interactor } from "./interactor";

/*
This interactor defines the following behaviors:
- Dragging the joint moves it
*/

export class JointInteractor extends Interactor {

    private jointPosBeforeDrag?: Coord;

    constructor(public joint: Joint, private stateService: StateService,
        private interactionService: InteractionService) {
        super(true, true);

        this.onDragStart$.subscribe((event) => {
            this.jointPosBeforeDrag = this.joint.coords;
        });

        this.onDrag$.subscribe((event) => {
            this.joint.setCoordinates(this.jointPosBeforeDrag!.add(this.dragOffset!));
        });

        this.onDragEnd$.subscribe((event) => {
            this.jointPosBeforeDrag = undefined;
        });

        // if backspace, delete
        this.onKeyDown$.subscribe((event) => {
            if (event.key === "Backspace") {
                this.stateService.getMechanism().removeJoint(this.joint.id);
            }
        });

    }
    
    public override specifyContextMenu(): ContextMenuOption[] {
        return [
            {
                label: "Create edge",
                action: () => {
                    console.log("Create edge");
                    this.enterCreatejointCaptureMode();
                },
                disabled: false
            },
            {
                label: "Delete",
                action: () => {
                    this.stateService.getMechanism().removeJoint(this.joint.id);
                },
                disabled: false
            }
        ];
        
    }
    
    private enterCreatejointCaptureMode(): void {
        const capture = new CreateLinkFromJointCapture(this.joint, this.interactionService);
        capture.onClick$.subscribe((mousePos) => {
            
            if (capture.getHoveringJoint() === undefined) { // if not hovering over a joint, create a new joint to attach to
                this.stateService.getMechanism().addLinkToJoint(this.joint.id, mousePos);
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