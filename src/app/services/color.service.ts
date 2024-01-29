import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {

  constructor() {}

  private linkColorOptions = [
    '#727FD5',
    '#2F3E9F',
    '#0D125A',
    // '#283493',
    // '#3948ab',
    // '#3f50b5',
    // '#5c6ac0',
    // '#7986cb',
    // '#c5cae9',
    '#207297',
    '#00695D',
    '#0D453E',
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

  getLinkColorOptions(){
    return this.linkColorOptions;
  }

  getJointColorOptions(){
    return this.jointColorOptions;
  }

  getForceColorOptions(){
    return this.forceColorOptions;
  }
}
