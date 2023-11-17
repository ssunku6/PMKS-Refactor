import { Coord } from "../model/coord";

export default class MousePosition {
    constructor(
        public readonly posScreen: Coord = new Coord(0, 0),
        public readonly posSVG: Coord = new Coord(0, 0),
        public readonly posModel: Coord = new Coord(0, 0)
    ) {}
}