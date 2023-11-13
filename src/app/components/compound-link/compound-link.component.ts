import { Component, Input } from '@angular/core';
import { Link } from 'src/app/model/link';
import { CompoundLink } from 'src/app/model/compound-link';
import { Joint } from 'src/app/model/joint';
import { Coord } from 'src/app/model/coord';
import { Mechanism } from 'src/app/model/mechanism';
import { StateService } from 'src/app/services/state.service';
import { Interactor } from 'src/app/interactions/interactor';
import { AbstractInteractiveComponent } from '../abstract-interactive/abstract-interactive.component';
import { InteractionService } from 'src/app/services/interaction.service';
import { CompoundLinkInteractor } from 'src/app/interactions/compound-link-interactor';
import { ColorService } from 'src/app/services/color.service';
import { SVGPathService } from 'src/app/services/svg-path.service';

@Component({
  selector: '[app-compound-link]',
  templateUrl: './compound-link.component.html',
  styleUrls: ['./compound-link.component.css']
})
export class CompoundLinkComponent extends AbstractInteractiveComponent {

  @Input() compoundLink!: CompoundLink;
  constructor(public override interactionService: InteractionService, 
				private stateService: StateService, 
				private colorService: ColorService, 
				private svgPathService: SVGPathService) {
    super(interactionService);
  }

  override registerInteractor(): Interactor {
    return new CompoundLinkInteractor(this.compoundLink, this.stateService, this.interactionService);
  }

  getColor():string{
	return this.colorService.getLinkColorFromID(this.compoundLink.id);
  }
	getDrawnPath(): string{
	let radius: number = 15;
	return ""; 
  }
}
