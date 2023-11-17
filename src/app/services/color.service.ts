import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ColorService {

    constructor() { }

    private linkColorOptions = [
        '#c5cae9',
        '#303e9f',
        '#0d125a',
        // '#283493',
        // '#3948ab',
        // '#3f50b5',
        // '#5c6ac0',
        // '#7986cb',
        // '#c5cae9',
        '#B2DFDB',
        '#26A69A',
        '#00695C',
    ];

    private jointColorOptions = ['#ffecb2'];

    private forceColorOptions = ['#3f50b5'];

    private linkLastColorIndex = 0;

    getLinkColorFromID(id: number) {
        return this.linkColorOptions[id % this.linkColorOptions.length];
    }

    getJointColorFromID(id: number) {
        return this.jointColorOptions[id % this.linkColorOptions.length];
    }

    getForceColorFromID(id: number) {
        return this.forceColorOptions[id % this.linkColorOptions.length];
    }
}
