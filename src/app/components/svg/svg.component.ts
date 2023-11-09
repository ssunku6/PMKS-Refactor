import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AbstractInteractiveComponent } from '../abstract-interactive/abstract-interactive.component';
import { SvgInteractor } from 'src/app/interactions/svg-interactor';
import { ContextMenuOption, Interactor } from 'src/app/interactions/interactor';
import { InteractionService } from 'src/app/services/interaction.service';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { StateService } from 'src/app/services/state.service';


@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent extends AbstractInteractiveComponent implements OnInit {


  constructor(public override interactionService: InteractionService,
    private stateService: StateService) {
    super(interactionService);
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();


    // save ONCE after any number of interactors have been dragged
    this.interactionService.onDragEndOnce$.subscribe((event) => {

    });
  }

  // handle keyboard events and send to interaction service
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log("InteractionDirective.onKeyDown", event.key);
    this.interactionService.onKeyDown(event);
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    console.log("InteractionDirective.onKeyUp", event.key);
    this.interactionService.onKeyUp(event);
  }


  override registerInteractor(): Interactor {
    let interactor = new SvgInteractor(this.stateService,this.interactionService);

    interactor.onKeyDown$.subscribe((event) => {
      if (event.key === "s") {
      }
    });

    return interactor;
  }
  
}
