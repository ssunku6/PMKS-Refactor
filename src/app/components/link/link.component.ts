import { Component, Input } from '@angular/core';
import { Link } from 'src/app/model/link';
import { Joint } from 'src/app/model/joint';
import { Coord } from 'src/app/model/coord';
import { Mechanism } from 'src/app/model/mechanism';
import { StateService } from 'src/app/services/state.service';
import { Interactor } from 'src/app/interactions/interactor';
import { AbstractInteractiveComponent } from '../abstract-interactive/abstract-interactive.component';
import { InteractionService } from 'src/app/services/interaction.service';
import { LinkInteractor } from 'src/app/interactions/link-interactor';
import { ColorService } from 'src/app/services/color.service';
import { SVGPathService } from 'src/app/services/svg-path.service';

@Component({
  selector: '[app-link]',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent extends AbstractInteractiveComponent {

  @Input() link!: Link;
  constructor(public override interactionService: InteractionService, 
				private stateService: StateService, 
				private colorService: ColorService, 
				private svgPathService: SVGPathService) {
    super(interactionService);
  }

  override registerInteractor(): Interactor {
    return new LinkInteractor(this.link, this.stateService, this.interactionService);
  }

  getColor():string{
	return this.colorService.getLinkColorFromID(this.link.id);
  }
	getDrawnPath(): string{
	let radius: number = 15;
	return this.svgPathService.getSingleLinkDrawnPath(this.link.joints.values(), radius);
  }
}
