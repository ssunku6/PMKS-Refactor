import { Injectable } from '@angular/core';
import { ContextMenuOption, Interactor } from '../interactions/interactor';

@Injectable({
    providedIn: 'root'
})
export class ContextMenuService {

    private visible: boolean = false;
    private position: { x: number, y: number } = { x: 0, y: 0 };
    private options: ContextMenuOption[] = [];

    constructor() { }

    /*
    Used by interaction service to show context and hide context menu based on mouse inputs
    */

    // on right click on interactor. show context menu at mouse position with interator-specified options
    public showContextMenu(interactor: Interactor, event: MouseEvent) {

        const menuOptions = interactor.specifyContextMenu();

        if (menuOptions.length === 0) {
            this.hideContextMenu();
            return;
        }

        this.visible = true;
        this.position.x = event.clientX;
        this.position.y = event.clientY;
        this.options = menuOptions;
    }

    public hideContextMenu() {
        this.visible = false;
        this.position = { x: 0, y: 0 };
        this.options = [];
    }

    /*
    Used by the context menu component for visibility and position information
    */
    public getVisibility(): boolean {
        return this.visible;
    }

    public getX(): number {
        return this.position.x;
    }

    public getY(): number {
        return this.position.y;
    }

    public getMenuOptions(): ContextMenuOption[] {
        return this.options;
    }

}
