import { Injectable } from '@angular/core';
import { Coord } from '../model/coord';
import { StateService, ZoomPan } from './state.service';
import { UnitConversionService } from './unit-conversion.service';




@Injectable({
    providedIn: 'root'
})
export class PanZoomService{

constructor(private stateService: StateService, private unitConversionService: UnitConversionService) {


}

public _onMouseScrollWheel(event: WheelEvent){
    event.stopPropagation();
    let panZoomValues = this.stateService.getPanZoom();

    let zoomDirection: number = event.deltaY;
    let zoomLeftFraction: number = event.offsetX / panZoomValues.windowWidth;
    let zoomTopFraction: number = event.offsetY / panZoomValues.windowHeight;
    let oldViewBoxWidth: number = panZoomValues.scaledViewBoxWidth;
    let oldViewBoxHeight: number = panZoomValues.scaledViewBoxHeight;

    if(zoomDirection > 0){
    
        panZoomValues.currentScale *= panZoomValues.zoomScale;
        panZoomValues.scaledViewBoxWidth = panZoomValues.windowWidth * panZoomValues.currentScale;
        panZoomValues.scaledViewBoxHeight = panZoomValues.windowHeight * panZoomValues.currentScale;

        panZoomValues.scaledViewBoxX -=((panZoomValues.scaledViewBoxWidth - oldViewBoxWidth) * zoomLeftFraction);
        panZoomValues.scaledViewBoxY -=((panZoomValues.scaledViewBoxHeight - oldViewBoxHeight) * zoomTopFraction);
    }else{

        panZoomValues.currentScale /= panZoomValues.zoomScale;
        panZoomValues.scaledViewBoxWidth = panZoomValues.windowWidth * panZoomValues.currentScale;
        panZoomValues.scaledViewBoxHeight = panZoomValues.windowHeight * panZoomValues.currentScale;

        panZoomValues.scaledViewBoxX += ((panZoomValues.scaledViewBoxWidth - oldViewBoxWidth) * -zoomLeftFraction);
        panZoomValues.scaledViewBoxY += ((panZoomValues.scaledViewBoxHeight - oldViewBoxHeight) * -zoomTopFraction);
    }
    this.stateService.setPanZoom(panZoomValues);

}

public _onSVGDrag(dragOffset: Coord){
    let panZoomValues: ZoomPan = this.stateService.getPanZoom();
    panZoomValues.scaledViewBoxX -= dragOffset.x;
    panZoomValues.scaledViewBoxY -= dragOffset.y;
    this.stateService.setPanZoom(panZoomValues);
}

public _onWindowResize(event: UIEvent){
    event.stopPropagation();
    let panZoomValues: ZoomPan = this.stateService.getPanZoom();
    panZoomValues.windowWidth = window.innerWidth;
    panZoomValues.windowHeight = window.innerHeight;
    panZoomValues.scaledViewBoxWidth = panZoomValues.windowWidth * panZoomValues.currentScale;
    panZoomValues.scaledViewBoxHeight = panZoomValues.windowHeight * panZoomValues.currentScale;
    this.stateService.setPanZoom(panZoomValues);
}


public getViewBox():string{
    let panZoomValues: ZoomPan = this.stateService.getPanZoom();
    return panZoomValues.scaledViewBoxX.toString() + " "
        +  panZoomValues.scaledViewBoxY.toString() + " "
        +  panZoomValues.scaledViewBoxWidth.toString() + " "
        +  panZoomValues.scaledViewBoxHeight.toString() + " ";
} 

}