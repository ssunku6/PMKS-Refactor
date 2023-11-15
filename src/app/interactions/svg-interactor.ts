import { Coord } from "../model/coord";
import { InteractionService } from "../services/interaction.service";
import { StateService } from "../services/state.service";
import { ContextMenuOption, Interactor } from "./interactor";
import { Mechanism } from "../model/mechanism";
import { CreateLinkFromGridCapture} from "./create-link-from-grid-capture"
import { PanZoomService } from "../services/pan-zoom.service";

/*
This handles any interaction with the SVG canvas.
*/

export class SvgInteractor extends Interactor {


    constructor(private stateService: StateService, 
        private interactionService: InteractionService, private panZoomService: PanZoomService) {
        super(true, true);

        this.onDragStart$.subscribe((event) => {
        });
        this.onDrag$.subscribe((event) => {
            this.panZoomService._onSVGDrag(this.currentMousePosInSVG!.subtract(this.startMousePosInSVG!));
        });
        this.onDragEnd$.subscribe((event) => {
        });
    }


    public override specifyContextMenu(): ContextMenuOption[] {
        const mechanism: Mechanism = this.stateService.getMechanism();
        let convertedMousePosAtRightClick = this.getMousePos();
        return [
            {
                label: "Create Link",
                action: () => {
                    this.enterAddLinkCaptureMode(convertedMousePosAtRightClick)
                },
                disabled: false
            }
        ];
        
    }
    private enterAddLinkCaptureMode(convertedMousePosAtRightClick: Coord): void {
        const capture = new CreateLinkFromGridCapture(convertedMousePosAtRightClick, this.interactionService);
        capture.onClick$.subscribe((mousePos) => {
            this.stateService.getMechanism().addLink(convertedMousePosAtRightClick, mousePos);
        });
        this.interactionService.enterClickCapture(capture);
    }

    public override toString(): string {
        return "SvgInteractor()";
    }

}