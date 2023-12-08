import { Component} from '@angular/core'
import { InteractionService } from 'src/app/services/interaction.service'
import { JointInteractor } from 'src/app/interactions/joint-interactor';


@Component({
    selector: 'app-edit-panel',
    templateUrl: './edit-panel.component.html',
    styleUrls: ['./edit-panel.component.scss'],

})
export class EditPanelComponent {


    constructor(private interactionServive: InteractionService){
    }
    

    getSelectedObjectType(): string{
        let obj = this.interactionServive.getSelectedObject();
        if(obj == undefined){
            return '';
        } else{
            return obj.constructor.name;
        }
    }
}