import { Injectable } from '@angular/core';
import { Mechanism } from '../model/mechanism';

/*
Stores the global state of the application. This is a singleton service.
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

}
