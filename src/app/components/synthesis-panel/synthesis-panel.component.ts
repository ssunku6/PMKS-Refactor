import { Component} from '@angular/core'
import { InteractionService } from 'src/app/services/interaction.service'
import { JointInteractor } from 'src/app/interactions/joint-interactor';


@Component({
    selector: 'app-synthesis-panel',
    templateUrl: './synthesis-panel.component.html',
    styleUrls: ['./synthesis-panel.component.scss'],

})

export class SynthesisPanelComponent {
    sectionExpanded: { [key: string]: boolean } = {
        threePos: false,
        path: false,
      };
    constructor(private interactionService: InteractionService){}
}
