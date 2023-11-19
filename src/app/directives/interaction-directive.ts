import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Interactor } from '../interactions/interactor';
import { InteractionService } from '../services/interaction.service';
import { PanZoomServiceOG } from '../services/pan-zoomog.service';

/*
InteractionDirectives are attached to some component that MUST extend AbstractInteractiveComponent.
They consume raw mouse events and send them to the global Interaction service, which will handle the 
events as needed.
*/

@Directive({
    selector: '[appInteractable]'
})
export class InteractionDirective {
    @Input() interactor!: Interactor;

    constructor(private interactionService: InteractionService, private panZoomService: PanZoomServiceOG) { }


    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        this.interactionService._onMouseDown(this.interactor, event);
    }

    @HostListener('mouseup', ['$event'])
    onMouseUp(event: MouseEvent) {
        this.interactionService._onMouseUp(this.interactor, event);
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        this.interactionService._onMouseMove(this.interactor, event);
    }

    @HostListener('contextmenu', ['$event'])
    onRightClick(event: MouseEvent) {
        this.interactionService._onMouseRightClick(this.interactor, event);
    }

}
