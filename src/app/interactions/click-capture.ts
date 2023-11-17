/*
An abstract class that describes where the user interface has entered a
specific mode in which clicks have a special meaning, different from their default behavior.
For example, clicking to create a node. Pressing escape should leave this mode.
This behavior is handled by the InteractionService.
*/
import { Coord } from "../model/coord";
import { Subject } from "rxjs";
import MousePosition from "../services/mouse-position";

export enum ClickCaptureID {
    CREATE_LINK_FROM_GRID,
    CREATE_FORCE_FROM_LINK,
    CREATE_LINK_FROM_JOINT,
    CREATE_LINK_FROM_LINK
}

export abstract class ClickCapture {
    
    onClick$ = new Subject<MousePosition>();
    onMouseMove$ = new Subject<MousePosition>();

    constructor(public id: ClickCaptureID) {}

    abstract getStartPos():Coord
}