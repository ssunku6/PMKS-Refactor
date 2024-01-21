import { Component, OnDestroy, OnInit} from '@angular/core'
import { Interactor } from 'src/app/interactions/interactor';
import { LinkInteractor } from 'src/app/interactions/link-interactor';
import { Link } from 'src/app/model/link';
import { Mechanism } from 'src/app/model/mechanism';
import { InteractionService } from 'src/app/services/interaction.service';
import { StateService } from 'src/app/services/state.service';
import { Joint } from 'src/app/model/joint';


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

    getSelectedObject(): Link{
        let link = this.interactionService as unknown as LinkInteractor;
        return link.getLink();
    }

    getLinkLength(){
        return this.getSelectedObject().calculateLength();
    }
    getLinkAngle(){
        return this.getSelectedObject().calculateAngle();
    }
    getLinkColor(){
        
    }
    getLinkJoints(): Map<number, Joint>{
        return this.getSelectedObject().joints;
    }
    getLinkComponents(): String{
        let joints = this.getLinkJoints();
        let components = "";
        joints.forEach((value: Joint, key: number) => {
            components += 'Joint' + value.getName() + ': x' + value.coords.x + ' y' + value.coords.y; 
        });
    }
    getLinkName(){

    }
    setLinkLength(){

    }
    setLinkAngle(){

    }
    setLinkColor(){

    }
    setLinkName(){

    }

}