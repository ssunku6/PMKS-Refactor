import {Link} from '../model/link'
import { Coord } from '../model/coord'
import {Joint} from '../model/joint'

export class CompoundLink{
    private _id: number;
    private _name: string;
    private _mass: number;
    private _centerOfMass: Coord;
    private _links: Map<number, Link>;


    constructor(id: number, linkA: Link, linkB: Link);
    constructor(id: number, links: Link[]);
    constructor(id: number, linkAORLinks: Link | Link[], linkB?: Link){
        this._id = id;
        this._name = '';
        this._mass = 0;
        this._links = new Map();
        //currently reference to array, may need to make a deep copy later
        if(Array.isArray(linkAORLinks)){
            linkAORLinks.forEach(link =>{
                this._links.set(link.id,link);
            });
        } else if(linkB){
            this._links.set(linkAORLinks.id,linkAORLinks);
            this._links.set(linkB.id, linkB);
        } else {
            throw new Error("Invalid Constructor Parameters");
        }
        this._centerOfMass = this.calculateCenterOfMass();
    }
     //getters
    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get mass(): number {
        return this._mass;
    }

    get centerOfMass(): Coord {
        return this._centerOfMass;
    }
    get links(): Map<number, Link>{
        return this._links;
    }
    //setters
    set name(value: string) {
        this._name = value;
    }

    set mass(value: number) {
        this._mass = value;
    }
    //TODO: complete secondary information calculations and modifications
    calculateCenterOfMass(): Coord{
        return new Coord(0,0);
    }
    addLink(newLink: Link){
        this._links.set(newLink.id,newLink);
        this.calculateCenterOfMass();
    }
    
    removeLink(idORRef: number | Link){
        if(typeof idORRef === 'number'){
            this._links.delete(idORRef);
        } else {
            this._links.delete(idORRef.id);
        }
        this.calculateCenterOfMass();
        if(this._links.size === 1){
            throw new Error("Compound Link now only contains 1 Link");
        }
    }
    containsLink(linkID: number): boolean {
        return this._links.has(linkID);
    }



}