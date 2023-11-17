import { Injectable } from '@angular/core';
import { Coord } from '../model/coord';
import MousePosition from './mouse-position';
import * as svgPanZoom from 'svg-pan-zoom';


@Injectable({
    providedIn: 'root'
})
export class PanZoomService {


    private ctm?: SVGMatrix;
    private mousePos: MousePosition = new MousePosition();

    private svgPanZoomInstance!: SvgPanZoom.Instance;

    // inits the svgPanZoomInstance with the given SVG element
    init(svgElement: SVGElement) {

        console.log("SvgService.init", svgElement);

        // use svg-pan-zoom library to handle panning and zooming SVG
        this.svgPanZoomInstance = svgPanZoom(svgElement, {
            zoomEnabled: true,
            fit: true,
            center: true,
            zoomScaleSensitivity: 0.15,
            dblClickZoomEnabled: false,
            maxZoom: 10000,
            minZoom: 0.00001, //These are not used, look at MIN_ZOOM
            onPan: this.handlePan.bind(this),
            onZoom: this.handleZoom.bind(this),
            beforePan: this.handleBeforePan.bind(this),
            beforeZoom: this.handleBeforeZoom.bind(this),
            onUpdatedCTM: this.updateCTM.bind(this),
        });
    }

    getMousePos(): MousePosition {
        return this.mousePos;
    }

    setMousePosScreen(screenPos: Coord) {
        this.mousePos = new MousePosition(screenPos, this.screenPosToSVGPos(screenPos), this.screenPosToModelPos(screenPos));
        console.log("Mouse Pos: ", this.mousePos);
    }

    screenPosToSVGPos(screenPos: Coord): Coord {
        if (!this.ctm) return new Coord(0, 0);

        const inverseCTM = this.ctm.inverse();
        const svgPos = screenPos.applyMatrix(inverseCTM);
        return new Coord(svgPos.x, svgPos.y);
    }

    svgPosToScreenPos(svgPos: Coord): Coord {

        if (!this.ctm) return new Coord(0, 0);

        const screenPos = svgPos.applyMatrix(this.ctm);
        return screenPos;
    }
    screenPosToModelPos(screenPos: Coord): Coord {
        let svgPos = this.screenPosToSVGPos(screenPos);
        return new Coord(svgPos.x / 100, svgPos.y / 100);
    }
    modelPosToSVGPos(modelPos: Coord): Coord {
        return new Coord(modelPos.x * 100, modelPos.y * 100);
    }


    private updateCTM(ctm: SVGMatrix) {
        console.log("CTM updated");
        this.ctm = ctm;
    }

    // handle pan and zoom elements
    private handlePan(newPan: SvgPanZoom.Point) {
        console.log("handlePan", newPan);
    }

    private handleZoom(newZoom: number) {
        console.log("handleZoom", newZoom);
    }

    private handleBeforePan(oldPan: SvgPanZoom.Point, newPan: SvgPanZoom.Point) {
        console.log("handleBeforePan", oldPan, newPan);
    }

    private handleBeforeZoom(oldZoom: number, newZoom: number) {
        console.log("handleBeforeZoom", oldZoom, newZoom);
    }
}