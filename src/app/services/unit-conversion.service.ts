import { Injectable } from '@angular/core';
import { Coord } from '../model/coord';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root'
})
export class UnitConversionService{

    constructor(private stateservice: StateService){}


    public mousePositionToSVGPosition(mousePos: Coord): Coord {
        let panZoomValues = this.stateservice.getPanZoom();
        let convertedX: number = 0;
        let convertedY: number = 0;
        return new Coord(convertedX,convertedY);
    }

    public mouseDeltaToModelDelta(mouseDelta: Coord): Coord{
        let panZoomValues = this.stateservice.getPanZoom();
        let convertedDelta: Coord = new Coord(mouseDelta.x * panZoomValues.currentScale, mouseDelta.y * panZoomValues.currentScale);
        return convertedDelta;
    }


    public mouseCoordToModelCoord(mouseCoord: Coord): Coord {
        let panZoomValues = this.stateservice.getPanZoom();
        let convertedX: number = panZoomValues.scaledViewBoxX + mouseCoord.x * panZoomValues.currentScale;
        let convertedY: number = panZoomValues.scaledViewBoxY + mouseCoord.y * panZoomValues.currentScale;
        return new Coord(convertedX,convertedY);
    }
    public modelCoordToSVGCoord(modelCoord: Coord): Coord {
        let panZoomValues = this.stateservice.getPanZoom();
        let convertedX: number = panZoomValues.scaledViewBoxX + modelCoord.x / panZoomValues.currentScale;
        let convertedY: number = panZoomValues.scaledViewBoxX + modelCoord.y / panZoomValues.currentScale;
        return modelCoord;
    }


}