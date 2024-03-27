import { Component, OnDestroy, OnInit} from '@angular/core'
import { Interactor } from 'src/app/controllers/interactor';
import { LinkInteractor } from 'src/app/controllers/link-interactor';
import { Link } from 'src/app/model/link';
import { Mechanism } from 'src/app/model/mechanism';
import { InteractionService } from 'src/app/services/interaction.service';
import { StateService } from 'src/app/services/state.service';
import { Joint } from 'src/app/model/joint';
import { ColorService } from 'src/app/services/color.service';
import { FormControl, FormGroup } from "@angular/forms";
import { LinkComponent } from 'src/app/components/Grid/link/link.component';
import { Coord } from 'src/app/model/coord';


@Component({
    selector: 'path-synthesis',
    templateUrl: './path-synthesis.component.html',
    styleUrls: ['./path-synthesis.component.scss'],

})
export class PathSynthesis{

    sectionExpanded: { [key: string]: boolean } = {
        LBasic: false,
      };
    

    constructor(private stateService: StateService, private interactionService: InteractionService, private colorService: ColorService){
        
    }

    

}
