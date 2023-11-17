import { Injectable } from '@angular/core';
import { Mechanism } from '../model/mechanism';

/*
Stores the global state of the application. This includes the model, global settings, and Pan/Zoom State. This is a singleton service.
Handles syncing client with server state, and undo/redo.
*/

export interface PanZoom {
    scaledViewBoxX: number;
    scaledViewBoxY: number;
    scaledViewBoxWidth: number;
    scaledViewBoxHeight: number;
    windowWidth: number;
    windowHeight: number;
    currentScale: number;
    zoomScale: number;
}




@Injectable({
    providedIn: 'root'
})
export class StateService {
    private panZoom: PanZoom;
    private mechanism: Mechanism;


    constructor() {
        console.log("StateService constructor");
        this.panZoom = {
            scaledViewBoxX: -(window.innerWidth/2),
            scaledViewBoxY: -(window.innerHeight/2),
            scaledViewBoxWidth: window.innerWidth,
            scaledViewBoxHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            currentScale: 1,
            zoomScale: 1.1
        }
        this.mechanism = new Mechanism();
    }

    public getMechanism(): Mechanism {
        return this.mechanism;
    }

    public getPanZoom(): PanZoom{
        return this.panZoom;
    }
    public setPanZoom(newPanZoomValues: PanZoom){
        this.panZoom.scaledViewBoxX = newPanZoomValues.scaledViewBoxX;
        this.panZoom.scaledViewBoxY = newPanZoomValues.scaledViewBoxY;
        this.panZoom.scaledViewBoxWidth = newPanZoomValues.scaledViewBoxWidth;
        this.panZoom.scaledViewBoxHeight = newPanZoomValues.scaledViewBoxHeight;
        this.panZoom.windowWidth = newPanZoomValues.windowWidth;
    }

}
