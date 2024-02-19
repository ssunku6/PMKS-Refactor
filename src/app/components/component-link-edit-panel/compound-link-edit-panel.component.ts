import { Component, OnDestroy, OnInit} from '@angular/core'
import { Interactor } from 'src/app/interactions/interactor';
import { LinkInteractor } from 'src/app/interactions/link-interactor';
import { Link } from 'src/app/model/link';
import { Mechanism } from 'src/app/model/mechanism';
import { InteractionService } from 'src/app/services/interaction.service';
import { StateService } from 'src/app/services/state.service';
import { Joint } from 'src/app/model/joint';
import { ColorService } from 'src/app/services/color.service';
import { FormControl, FormGroup } from "@angular/forms";
import { LinkComponent } from '../link/link.component';
import { Coord } from 'src/app/model/coord';
import {CompoundLinkInteractor} from "../../interactions/compound-link-interactor";
import {CompoundLink} from "../../model/compound-link";


@Component({
    selector: 'app-compound-link-edit-panel',
    templateUrl: './compound-link-edit-panel.component.html',
    styleUrls: ['./compound-link-edit-panel.component.scss'],

})
export class CompoundLinkEditPanelComponent {

    sectionExpanded: { [key: string]: boolean } = {
        LBasic: true,
        LVisual: false,
        LComponent: false,
        LMass: true,
        LCompound: true,
        FBasic: true,
        FVisual: false,
      };
      isEditingTitle: boolean = false;
      selectedIndex: number = this.getColorIndex();

    constructor(private stateService: StateService, private interactionService: InteractionService, private colorService: ColorService){

    }

    getSelectedObject(): CompoundLink {
        let compoundLink = this.interactionService.getSelectedObject() as CompoundLinkInteractor;
        return compoundLink.compoundLink as CompoundLink;
    }

    getAllConnectedLinks(): IterableIterator<Link> {
        let compoundLink = this.getSelectedObject();
        return compoundLink.links.values();
    }

    getLinkLength(currentLink: Link): number{
        // @ts-ignore
        return currentLink.calculateLength()?.toFixed(4) as unknown as number;
    }
    getLinkAngle(currentLink: Link): number{
        return currentLink.calculateAngle()?.toFixed(4) as unknown as number;
    }

    getLinkJoints(currentLink: Link): Map<number, Joint>{
        return currentLink.joints;
    }

    //Returns the joints contained in a link.
    getLinkComponents(currentLink: Link): IterableIterator<Joint>{
        return this.getLinkJoints(currentLink).values();
    }

    getCompoundLinkName(): string{
        return this.getSelectedObject().name;
    }
    getCompoundLinkLockState(): boolean{
      return this.getSelectedObject().lock;
    }

    setCompoundLinkName(newName: string){
        this.getSelectedObject().name = newName;
        console.log("it set the new name " + this.getSelectedObject().name);
        this.isEditingTitle=false;
    }

    /*
    addTracer(): void{
        let CoM = this.getSelectedObject().centerOfMass;
        let tracer = Joint.constructor(-1, CoM);
        this.getSelectedObject().addTracer(tracer);
    }
     */

    deleteLink(){
        console.log("link " + this.getSelectedObject().id + " has been deleted")
        this.stateService.getMechanism().removeLink(this.getSelectedObject().id);
    }

    onTitleBlockClick(event: MouseEvent): void {
        console.log('Title clicked!');
        const clickedElement = event.target as HTMLElement;
        // Check if the clicked element has the 'edit-svg' class, so we can enable editing
        if (clickedElement && clickedElement.classList.contains('edit-svg')) {
          console.log('Edit SVG clicked!');
          this.isEditingTitle = true;
        }
      }

    roundToFour(round:number): number{
        return round.toFixed(4) as unknown as number;
    }

    getColors(): string[]{
        return this.colorService.getLinkColorOptions();
    }

    /*
    getColor(): string{
        return this.getSelectedObject().color;
    }
     */

    getColorIndex(): number{
        return this.colorService.getLinkColorIndex(this.getSelectedObject().id);
    }

    /*
    //TODO
    setCompoundLinkColor(newColor: number){
        console.log(newColor);
        this.getSelectedObject().setColor(newColor);
        this.selectedIndex=newColor;
    }
     */


}
