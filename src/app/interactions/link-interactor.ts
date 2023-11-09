import { Coord } from "../model/coord";
import { Link } from "../model/link";
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

export class LinkInteractor extends Interactor {

    private linkPosJointBeforeDrag?: Map<number,Coord>;
    private linkPosForceBeforeDrag?: Map<number,Coord[]>

    constructor(public link: Link, private stateService: StateService,
        private interactionService: InteractionService) {
        super(true, true);

        this.onDragStart$.subscribe((event) => {
            this.linkPosJointBeforeDrag = new Map();
            this.linkPosForceBeforeDrag = new Map();
            for(const [jointID, joint] of this.link.joints){
                this.linkPosJointBeforeDrag.set(jointID,joint._coords)
            }
            for(const [forceID, force] of this.link.forces){
                this.linkPosForceBeforeDrag.set(forceID,[force.start,force.end])
            }
        });

        this.onDrag$.subscribe((event) => {
            this.link.setCoordinates(this.linkPosJointBeforeDrag!, this.linkPosForceBeforeDrag!, this.dragOffset!);
        });

        this.onDragEnd$.subscribe((event) => {
            this.linkPosJointBeforeDrag = undefined;
            this.linkPosForceBeforeDrag = undefined;
        });

        // if backspace, delete
        this.onKeyDown$.subscribe((event) => {
            if (event.key === "Backspace") {
                this.stateService.getMechanism().removeLink(this.link.id);
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
        let mousePosAtRightClick = this.getMousePos()
        availableContext.push(
            {
                label: "Attach Link",
                action: () => {this.enterAddLinkCaptureMode(mousePosAtRightClick)},
                disabled: false
            },
            {
                label: "Attach Tracer Point",
                action: () => {mechanism.addJointToLink(this.link.id, mousePosAtRightClick)},
                disabled: false
            },
            {
                label: "Attach Force",
                action: () => {this.enterAddForceCaptureMode(mousePosAtRightClick)},
                disabled: false
            },
            {
                label: "Delete Link",
                action: () => {mechanism.removeLink(this.link.id)},
                disabled: false
            },
            );
            
        return availableContext;
        
    }
    
    private enterAddLinkCaptureMode(mousePosAtRightClick: Coord): void {
        const capture = new CreateLinkFromLinkCapture(this.link, mousePosAtRightClick, this.interactionService);
        capture.onClick$.subscribe((mousePos) => {
            this.stateService.getMechanism().addLinkToLink(this.link.id,mousePosAtRightClick, mousePos);
        });
        this.interactionService.enterClickCapture(capture);
    }
    private enterAddForceCaptureMode(mousePosAtRightClick: Coord): void {
        const capture = new CreateForceFromLinkCapture(this.link, mousePosAtRightClick, this.interactionService);
        capture.onClick$.subscribe((mousePos) => {
            this.stateService.getMechanism().addForceToLink(this.link.id,mousePosAtRightClick, mousePos);
        });
        this.interactionService.enterClickCapture(capture);
    }

    public override toString(): string {
        return "LinkInteractor(" + this.link.name + ")";
    }

}