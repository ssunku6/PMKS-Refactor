import { Component} from '@angular/core'
import { InteractionService } from 'src/app/services/interaction.service'
import { JointInteractor } from 'src/app/controllers/joint-interactor';


@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss'],

})
export class SettingsPanelComponent{
  public open = true;

  sectionExpanded: { [key: string]: boolean } = {
    LBasic: true,
    LVisual: true,
  };

  gridEnabled: boolean= true;
  minorGridEnabled: boolean = true;

  constructor(private interactionService: InteractionService){

  }


  closePanel(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.settings')) {
      this.open = false;
    }
  }
  handleToggleGridChange(stateChange: boolean){
    this.gridEnabled=stateChange;
  }

  getGridEnabled(): boolean{
    return this.gridEnabled;
  }

  handleToggleMinorGridChange(stateChange: boolean){
    this.minorGridEnabled=stateChange;
  }

  getMinorGridEnabled(): boolean{
    return this.minorGridEnabled;
  }
}
