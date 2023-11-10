import { Coord } from "../model/coord";
import { Joint } from "../model/joint";
import { InteractionService } from "../services/interaction.service";
import { ClickCapture, ClickCaptureID } from "./click-capture";
import { JointInteractor } from "./joint-interactor";

export class CreateLinkFromJointCapture extends ClickCapture {


    private hoveringJoint?: Joint;

    constructor(private parentJoint: Joint, private interactionService: InteractionService) {
        super(ClickCaptureID.CREATE_LINK_FROM_JOINT);


        // on mouse move, if hovering over a Joint, store it
        this.onMouseMove$.subscribe((event) => {
            const hovering = interactionService.getHoveringObject();
            if (hovering instanceof JointInteractor) {
                this.hoveringJoint = hovering.joint;
            } else {
                this.hoveringJoint = undefined;
            }
        });

    }
    public getStartPos(): Coord {
        return this.parentJoint.coords;
    }
    public getHoveringJoint(): Joint | undefined {
        return this.hoveringJoint;
    }
    
}