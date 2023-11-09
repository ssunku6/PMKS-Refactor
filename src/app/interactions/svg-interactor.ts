import { Coord } from "../model/coord";
import { InteractionService } from "../services/interaction.service";
import { StateService } from "../services/state.service";
import { ContextMenuOption, Interactor } from "./interactor";
import { Mechanism } from "../model/mechanism";
import { CreateLinkFromGridCapture} from "./create-link-from-grid-capture"
/*
This handles any interaction with the SVG canvas.
*/

export class SvgInteractor extends Interactor {

    constructor(private stateService: StateService, 
        private interactionService: InteractionService) {
        super(true, true);
    }
    
    public override specifyContextMenu(): ContextMenuOption[] {
        const mechanism: Mechanism = this.stateService.getMechanism();
        let mousePosAtRightClick = this.getMousePos()
        return [
            {
                label: "Create Link",
                action: () => {
                    this.enterAddLinkCaptureMode(mousePosAtRightClick)
                },
                disabled: false
            }
        ];
        
    }
    private enterAddLinkCaptureMode(mousePosAtRightClick: Coord): void {
        const capture = new CreateLinkFromGridCapture(mousePosAtRightClick, this.interactionService);
        capture.onClick$.subscribe((mousePos) => {
            this.stateService.getMechanism().addLink(mousePosAtRightClick, mousePos);
        });
        this.interactionService.enterClickCapture(capture);
    }

    public override toString(): string {
        return "SvgInteractor()";
    }

}