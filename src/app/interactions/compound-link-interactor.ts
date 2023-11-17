import { Coord } from "../model/coord";
import { Link } from "../model/link";
import { CompoundLink } from "../model/compound-link";
import { Mechanism } from "../model/mechanism";
import { InteractionService } from "../services/interaction.service";
import { StateService } from "../services/state.service";
import { ClickCapture, ClickCaptureID } from "./click-capture";
import { CreateLinkFromLinkCapture } from "./create-link-from-link-capture";
import { CreateForceFromLinkCapture } from "./create-force-from-link-capture";
import { ContextMenuOption, Interactor } from "./interactor";

/*
This interactor defines the following behaviors:
- Dragging the Link moves it
*/

export class CompoundLinkInteractor extends Interactor {

    private linkPosJointBeforeDrag?: Map<number,Coord>;
    private linkPosForceBeforeDrag?: Map<number,Coord[]>

    constructor(public compoundLink: CompoundLink, private stateService: StateService,
        private interactionService: InteractionService) {
        super(true, true);

        this.onDragStart$.subscribe((event) => {
        });

        this.onDrag$.subscribe((event) => {
        });

        this.onDragEnd$.subscribe((event) => {
            this.linkPosJointBeforeDrag = undefined;
            this.linkPosForceBeforeDrag = undefined;
        });

        // if backspace, delete
        this.onKeyDown$.subscribe((event) => {
            if (event.key === "Backspace") {
                this.stateService.getMechanism().removeLink(this.compoundLink.id);
            }
        });

    }
    

    /**
     * Determines what options should be shown for the context menu when right clicking on a Link
     * 
     * @returns 
     */
    public override specifyContextMenu(): ContextMenuOption[] {

        let availableContext: ContextMenuOption[] = [];
        const mechanism: Mechanism = this.stateService.getMechanism();
        let mousePosAtRightClick = this.getMousePos().posModel;
        availableContext.push(
            {
                label: "Attach Link",
                action: () => {this.enterAddLinkCaptureMode(mousePosAtRightClick)},
                disabled: false
            },
            {
                label: "Attach Tracer Point",
                action: () => {mechanism.addJointToLink(this.compoundLink.id, mousePosAtRightClick)},
                disabled: false
            },
            {
                label: "Attach Force",
                action: () => {this.enterAddForceCaptureMode(mousePosAtRightClick)},
                disabled: false
            },
            {
                label: "Delete Link",
                action: () => {mechanism.removeLink(this.compoundLink.id)},
                disabled: false
            },
            );
            
        return availableContext;
        
    }
    
    private enterAddLinkCaptureMode(mousePosAtRightClick: Coord): void {
    }
    private enterAddForceCaptureMode(mousePosAtRightClick: Coord): void {
    }

    public override toString(): string {
        return "CompoundLinkInteractor(" + this.compoundLink.name + ")";
    }

}