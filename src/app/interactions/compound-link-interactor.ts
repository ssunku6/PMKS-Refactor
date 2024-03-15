import { Coord } from "../model/coord";
import { Link } from "../model/link";
import { Joint } from "../model/joint";
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

    private jointsStartPosModel: Map<number,Coord> = new Map();
    

    constructor(public compoundLink: CompoundLink, private stateService: StateService,
        private interactionService: InteractionService) {
        super(true, true);

        this.onDragStart$.subscribe((event) => {
            this.compoundLink.links.forEach((link: Link,id: number) =>{
                link.joints.forEach((joint: Joint, id: number) =>{
                    this.jointsStartPosModel.set(id, joint._coords);
                });
            });
        });

        this.onDrag$.subscribe((event) => {
            this.jointsStartPosModel.forEach((coord: Coord, jointID: number)=>{
                this.stateService.getMechanism().setJointCoord(jointID, coord.add(this.dragOffsetInModel!))
            });
        });
        this.onDragEnd$.subscribe((event) => {
            this.jointsStartPosModel.clear();
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
        let modelPosAtRightClick = this.getMousePos().model;
        availableContext.push(
            {
                icon: 'assets/contextMenu/addLink.svg',
                label: "Attach Link",
                action: () => {this.enterAddLinkCaptureMode(modelPosAtRightClick)},
                disabled: false
            },
            {
                icon: 'assets/contextMenu/addTracer.svg',
                label: "Attach Tracer Point",
                action: () => {mechanism.addJointToLink(this.compoundLink.id, modelPosAtRightClick)},
                disabled: false
            },
            {
                icon: 'assets/contextMenu/addForce.svg',
                label: "Attach Force",
                action: () => {this.enterAddForceCaptureMode(modelPosAtRightClick)},
                disabled: false
            },
            {
                icon: 'assets/contextMenu/trash.svg',
                label: "Delete Link",
                action: () => {mechanism.removeLink(this.compoundLink.id)},
                disabled: false
            },
            );
            
        return availableContext;
        
    }
    
    private enterAddLinkCaptureMode(modelPosAtRightClick: Coord): void {
    }
    private enterAddForceCaptureMode(modelPosAtRightClick: Coord): void {
    }

    public override toString(): string {
        return "CompoundLinkInteractor(" + this.compoundLink.name + ")";
    }

}