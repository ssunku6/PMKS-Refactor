import { Coord } from "../model/coord";
import { Link } from "../model/link";
import { Mechanism } from "../model/mechanism";
import { InteractionService } from "../services/interaction.service";
import { StateService } from "../services/state.service";
import { ClickCapture, ClickCaptureID } from "./click-capture";
import { CreateLinkFromLinkCapture } from "./create-link-from-link-capture";
import { CreateForceFromLinkCapture } from "./create-force-from-link-capture";
import { ContextMenuOption, Interactor } from "./interactor";
import { UnitConversionService } from "../services/unit-conversion.service";

/*
This interactor defines the following behaviors:
- Dragging the Link moves it
*/

export class LinkInteractor extends Interactor {


    constructor(public link: Link, private stateService: StateService,
        private interactionService: InteractionService, 
        private unitConversionService: UnitConversionService) {
        super(true, true);

        this.onDragStart$.subscribe((event) => {

        });
        this.onDrag$.subscribe((event) => {
            let convertedOffset: Coord = this.unitConversionService.mouseDeltaToModelDelta(this.dragOffset!);
            this.link.setCoordinates(convertedOffset);
        });
        this.onDragEnd$.subscribe((event) => {
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
        let convertedMousePosAtRightClick = this.unitConversionService.mouseCoordToModelCoord(this.getMousePos());
        availableContext.push(
            {
                label: "Attach Link",
                action: () => {this.enterAddLinkCaptureMode(convertedMousePosAtRightClick)},
                disabled: false
            },
            {
                label: "Attach Tracer Point",
                action: () => {mechanism.addJointToLink(this.link.id, convertedMousePosAtRightClick)},
                disabled: false
            },
            {
                label: "Attach Force",
                action: () => {this.enterAddForceCaptureMode(convertedMousePosAtRightClick)},
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
    
    private enterAddLinkCaptureMode(convertedMousePosAtRightClick: Coord): void {
        const capture = new CreateLinkFromLinkCapture(this.link, convertedMousePosAtRightClick, this.interactionService);
        capture.onClick$.subscribe((mousePos) => {
            let convertedMousePos = this.unitConversionService.mouseCoordToModelCoord(mousePos);
            this.stateService.getMechanism().addLinkToLink(this.link.id,convertedMousePosAtRightClick, convertedMousePos);
        });
        this.interactionService.enterClickCapture(capture);
    }
    private enterAddForceCaptureMode(convertedMousePosAtRightClick: Coord): void {
        const capture = new CreateForceFromLinkCapture(this.link, convertedMousePosAtRightClick, this.interactionService);
        capture.onClick$.subscribe((mousePos) => {
            let convertedMousePos = this.unitConversionService.mouseCoordToModelCoord(mousePos);
            this.stateService.getMechanism().addForceToLink(this.link.id,convertedMousePosAtRightClick, convertedMousePos);
        });
        this.interactionService.enterClickCapture(capture);
    }

    public override toString(): string {
        return "LinkInteractor(" + this.link.name + ")";
    }

}