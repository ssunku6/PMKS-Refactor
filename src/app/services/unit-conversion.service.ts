import { Injectable } from '@angular/core';
import { Coord } from '../model/coord';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root'
})
export class UnitConversionService{

    constructor(private stateservice: StateService){}


    public mousePositionToSVGPosition(mousePos: Coord): Coord {
        let panZoomValues = this.stateservice.getZoomPan();
        let convertedX: number = 0;
        let convertedY: number = 0;
        return new Coord(convertedX,convertedY);
    }

    public mouseDeltaToModelDelta(mouseDelta: Coord): Coord{
        let panZoomValues = this.stateservice.getZoomPan();
        let convertedDelta: Coord = new Coord(mouseDelta.x * panZoomValues.currentScale, mouseDelta.y * panZoomValues.currentScale);
        return convertedDelta;
    }


    public mouseCoordToModelCoord(mouseCoord: Coord): Coord {
        let panZoomValues = this.stateservice.getZoomPan();
        let convertedX: number = panZoomValues.scaledViewBoxX + mouseCoord.x * panZoomValues.currentScale;
        let convertedY: number = panZoomValues.scaledViewBoxY + mouseCoord.y * panZoomValues.currentScale;
        return new Coord(convertedX,convertedY);
    }
    public modelCoordToMouseCoord(modelCoord: Coord): Coord {
        let panZoomValues = this.stateservice.getZoomPan();
        let convertedX: number = (modelCoord.x / panZoomValues.currentScale) - panZoomValues.scaledViewBoxX;
        let convertedY: number = (modelCoord.y / panZoomValues.currentScale) - panZoomValues.scaledViewBoxY;
        return modelCoord;
    }


}