import { Component} from '@angular/core'

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
    constructor(){
    }
  graphExpanded: { [key: string]: boolean } = {
    basicBasic: false,
    basicVisual: false,
    advancedSettingsBasic: false,
    advancedSettingsVisual: false
  };

}
