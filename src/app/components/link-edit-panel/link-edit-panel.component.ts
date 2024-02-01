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


@Component({
    selector: 'app-link-edit-panel',
    templateUrl: './link-edit-panel.component.html',
    styleUrls: ['./link-edit-panel.component.scss'],

})
export class LinkEditPanelComponent{

    sectionExpanded: { [key: string]: boolean } = {
        LBasic: true,
        LVisual: false,
        LComponent: false,
        LMass: true,
        LCompound: true,
        FBasic: true,
        FVisual: false,
      };

    constructor(private stateService: StateService, private interactionService: InteractionService){
        
    }
    lengthFormControl: FormControl = new FormControl();
    angleFormControl: FormControl = new FormControl();

    getSelectedObject(): Link{
        let link = this.interactionService.getSelectedObject() as LinkInteractor;
        return link.getLink();
    }

    getLinkLength(): number{
        return this.getSelectedObject().calculateLength();
    }
    getLinkAngle(): number{
        return this.getSelectedObject().calculateAngle();
        
    }
   
    //TODO
    getLinkColor(){
        
    }
    getLinkJoints(): Map<number, Joint>{
        return this.getSelectedObject().joints;
    }
    
    //Returns the joints contained in a link.
    getLinkComponents():IterableIterator<Joint>{
        console.log(this.getLinkJoints());
        return this.getLinkJoints().values();
    }
    
    getLinkName(): string{
        return this.getSelectedObject().name;
    }
    setLinkLength(newLength: number): void{
        this.getSelectedObject().setLength(newLength);
    }
    setLinkAngle(newAngle: number): void{
        this.getSelectedObject().setAngle(newAngle);
    }
    //TODO
    setLinkColor(newColor: number){
    }

    setLinkName(newName: string){
        this.getSelectedObject().name = newName;
    }

    addTracer(): void{
        let CoM = this.getSelectedObject().centerOfMass;
        let tracer = Joint.constructor(-1, CoM);
        this.getSelectedObject().addTracer(tracer);
    }


}
