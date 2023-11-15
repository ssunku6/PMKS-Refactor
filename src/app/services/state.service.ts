import { Injectable } from '@angular/core';
import { Mechanism } from '../model/mechanism';

/*
Stores the global state of the application. This includes the model, global settings, and Pan/Zoom State. This is a singleton service.
Handles syncing client with server state, and undo/redo.
*/

export interface ZoomPan {

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
    private zoomPan: ZoomPan;
    private mechanism: Mechanism;
    readonly zoomScale: number = 1.1;


    constructor() {
        console.log("StateService constructor");
        this.zoomPan = {
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

    public getPanZoom(): ZoomPan{
        return this.zoomPan;
    }
    public setPanZoom(newPanZoomValues: ZoomPan){
        this.zoomPan.scaledViewBoxX = newPanZoomValues.scaledViewBoxX;
        this.zoomPan.scaledViewBoxY = newPanZoomValues.scaledViewBoxY;
        this.zoomPan.scaledViewBoxWidth = newPanZoomValues.scaledViewBoxWidth;
        this.zoomPan.scaledViewBoxHeight = newPanZoomValues.scaledViewBoxHeight;
        this.zoomPan.windowWidth = newPanZoomValues.windowWidth;
    }

}
