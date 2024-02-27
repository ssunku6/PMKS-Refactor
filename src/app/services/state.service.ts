import { Injectable } from '@angular/core';
import { Mechanism } from '../model/mechanism';
import { KinematicSolverService } from './kinematic-solver.service';
/*
Stores the global state of the application. This includes the model, global settings, and Pan/Zoom State. This is a singleton service.
Handles syncing client with server state, and undo/redo.
*/


@Injectable({
    providedIn: 'root'
})
export class StateService {

    private mechanism: Mechanism;


    constructor() {
        console.log("StateService constructor");

        this.mechanism = new Mechanism();

    }
    
    public getMechanism(): Mechanism {
        return this.mechanism;
    }
    public getMechanismObservable(){
        return this.mechanism._mechanismChange$;
    }
}
