import { Component} from '@angular/core'
import {StateService} from "../../services/state.service";
import {InteractionService} from "../../services/interaction.service";
import {JointInteractor} from "../../interactions/joint-interactor"
import {Joint} from "../../model/joint";

interface Tab {
    selected: boolean,
    label: string,
    icon: string
}
@Component({
    selector: 'app-joint-edit-panel',
    templateUrl: './joint-edit-panel.component.html',
    styleUrls: ['./joint-edit-panel.component.scss'],

})

export class jointEditPanelComponent {

  graphExpanded: { [key: string]: boolean } = {
    basicBasic: false,
    basicVisual: false,
    advancedSettingsBasic: false,
    advancedSettingsVisual: false
  };

  constructor(private stateService: StateService, private interactorService: InteractionService,){
    console.log("GraphComponent.constructor");
  }

  getCurrentJoint(){
    let currentJointInteractor = this.interactorService.getSelectedObject();
    return (currentJointInteractor as JointInteractor).getJoint();
  }

  getJointName(): string {
    return this.getCurrentJoint().name + "<- here is the name of the joint";
  }
  setJointName(newName: string){
    this.getCurrentJoint().name = newName;
  }
  getJointColor(){

  }
  setJointColor(){

  }


}
