import { Component, OnDestroy, OnInit} from '@angular/core'


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

    constructor(){
    }

    getLinkLength(){

    }
    getLinkAngle(){

    }
    getLinkColor(){

    }
    getLinkJoints(){

    }
    getLinkComponents(){
        this.getLinkJoints();
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