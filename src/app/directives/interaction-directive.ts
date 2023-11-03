import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Interactor } from '../interactions/interactor';
import { InteractionService } from '../services/interaction.service';

/*
InteractionDirectives are attached to some component that MUST extend AbstractInteractiveComponent.
They consume raw mouse events and send them to the global Interaction service, which will convert
those events to selection and drag events.
*/

@Directive({
    selector: '[appInteractable]'
})
export class InteractionDirective {
    @Input() interaction!: Interactor;

    constructor(private interactionService: InteractionService) { }


    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        this.interactionService._onMouseDown(this.interaction, event);
    }

    @HostListener('mouseup', ['$event'])
    onMouseUp(event: MouseEvent) {
        this.interactionService._onMouseUp(this.interaction, event);
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        this.interactionService._onMouseMove(this.interaction, event);
    }

    @HostListener('contextmenu', ['$event'])
    onRightClick(event: MouseEvent) {
        this.interactionService._onMouseRightClick(this.interaction, event);
    }

}
