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

    getLinkLength(): FormControl{
        this.lengthFormControl.setValue(this.getSelectedObject().calculateLength());
        return this.lengthFormControl;
    }
    getLinkAngle(): FormControl{
        this.angleFormControl.setValue(this.getSelectedObject().calculateAngle());
        return this.angleFormControl;
    }
   
    //TODO
    getLinkColor(){
        
    }
    getLinkJoints(): Map<number, Joint>{
        return this.getSelectedObject().joints;
    }
    
    /*getLinkComponents(): String{
        let joints = this.getLinkJoints();
        let components = '';
        joints.forEach((value: Joint, key: number) => {
            let xCoord = value.coords.x.toFixed(4);
            let yCoord = value.coords.y.toFixed(4);
            components += 'Joint ' + value.name + ': x: ' + xCoord + ' y: ' + yCoord + '\n'; 
        });
        return components;
    }*/

    getLinkComponents() {
        const elementContainer = document.getElementById('linkComponents');
        if (elementContainer) {
            let joints = this.getLinkJoints();
            // Loop through your data
            joints.forEach((value: Joint, key: number) => {
                console.log(value)
              // Create a new element
              const dualInputBlock = document.createElement('dual-input-block');
              dualInputBlock.setAttribute('formControl1', value.coords.x.toFixed(4));
              dualInputBlock.setAttribute('formControl2', value.coords.y.toFixed(4));
              dualInputBlock.innerText = `Link ${value.name}`; // Update the text content
              // Set the content of the element based on the current data item or loop index
        
              // Append the new element to the container
              elementContainer?.appendChild(dualInputBlock);
            });
          }
    }
    
    getLinkName(): string{
        return this.getSelectedObject().name;
    }
    setLinkLength(newLength: number){
        this.getSelectedObject().setLength(newLength);
    }
    setLinkAngle(newAngle: number){
        this.getSelectedObject().setAngle(newAngle);
    }
    //TODO
    setLinkColor(newColor: number){
    }
    setLinkName(newName: string){
        this.getSelectedObject().name = newName;
    }

    addTracer(){
        let CoM = this.getSelectedObject().centerOfMass;
        let tracer = Joint.constructor(0, CoM);
        this.getSelectedObject().addTracer(tracer);
    }

   

}
