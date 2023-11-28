import { Injectable } from '@angular/core';
import { Coord } from "../model/coord";
import { UnitConversionService } from './unit-conversion.service';



export interface MousePosition {
    screen: Coord;
    svg: Coord;
    model: Coord;
}
