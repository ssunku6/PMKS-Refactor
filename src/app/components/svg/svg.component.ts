import { AfterViewInit, Component, HostListener, OnInit, ViewChild,ElementRef } from '@angular/core';
import { AbstractInteractiveComponent } from '../abstract-interactive/abstract-interactive.component';
import { SvgInteractor } from 'src/app/interactions/svg-interactor';
import { ContextMenuOption, Interactor } from 'src/app/interactions/interactor';
import { InteractionService } from 'src/app/services/interaction.service';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { StateService } from 'src/app/services/state.service';
import { PanZoomServiceOG } from 'src/app/services/pan-zoomog.service';
import { UnitConversionService } from 'src/app/services/unit-conversion.service';
import { PanZoomService } from 'src/app/services/pan-zoom.service';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent extends AbstractInteractiveComponent implements OnInit, AfterViewInit{
  @ViewChild('rootSVG') root!: ElementRef<SVGElement>;

  constructor(public override interactionService: InteractionService,
    private stateService: StateService, private panZoomService: PanZoomService, private unitConversionService: UnitConversionService) {
    
    super(interactionService);
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.panZoomService.init(this.root.nativeElement);

  }

  override registerInteractor(): Interactor {
    let interactor = new SvgInteractor(this.stateService, this.interactionService);

    interactor.onKeyDown$.subscribe((event) => {
      if (event.key === "s") {
      }
    });

    return interactor;
  }
}
