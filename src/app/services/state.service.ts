import { Injectable } from '@angular/core';
import { Mechanism } from '../model/mechanism';
import { Coord } from '../model/coord';
import { UnitConversionService } from './unit-conversion.service';
/*
Stores the global state of the application. This includes the model, global settings, and Pan/Zoom State. This is a singleton service.
Handles syncing client with server state, and undo/redo.
*/


@Injectable({
    providedIn: 'root'
})
export class StateService {

    private mechanism: Mechanism;


    constructor(private unitConverter: UnitConversionService) {
        console.log("StateService constructor");

        this.mechanism = new Mechanism();

    }
    
    public getMechanism(): Mechanism {
        return this.mechanism;
    }
}
