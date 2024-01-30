import { Coord } from '../model/coord'
import { Joint } from '../model/joint'
import { Force } from '../model/force'

export class Link {
    private _id: number;
    private _name: string;
    private _mass: number;
    private _centerOfMass: Coord;
    private _joints: Map<number, Joint>;
    private _forces: Map<number, Force>;

    constructor(id: number, jointA: Joint, jointB: Joint);
    constructor(id: number, joints: Joint[]);
    constructor(id: number, jointAORJoints: Joint | Joint[], jointB?: Joint){
        this._id = id;
        this._name = this._name = id as unknown as string;
        this._mass = 0;
        this._forces = new Map();
        this._joints = new Map();
        if(Array.isArray(jointAORJoints)){
            jointAORJoints.forEach(joint => {
                this._joints.set(joint.id, joint);
            });
        } else if(jointB){
            this._joints.set(jointAORJoints.id,jointAORJoints);
            this._joints.set(jointB.id,jointB);
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

    get joints(): Map<number,Joint> {
        return this._joints;
    }

    get forces(): Map<number,Force> {
        return this._forces;
    }
    //setters
    set name(value: string) {
        this._name = value;
    }

    set mass(value: number) {
        this._mass = value;
    }


    //TODO: complete secondary information calculations and modifications
    addTracer(newJoint: Joint){
        this._joints.set(newJoint.id,newJoint);
        this.calculateCenterOfMass();
    }

    removeJoint(idORRef: number | Joint){
        let id: number;
        if(typeof idORRef === 'number'){
            id = idORRef;
        } else {
            id = idORRef.id;
        }

        if(this._joints.has(id)){
            this._joints.delete(id);
        } else {
            //may need to throw error here in future
        }

        this.calculateCenterOfMass();
        if(this._joints.size === 1){
            throw new Error("Link now only contains 1 Joint");
        }
    }

    addForce(newForce: Force){
        this._forces.set(newForce.id, newForce);
    }

    removeForce(idORRef: number | Force){
        if(typeof idORRef === 'number'){
            this._forces.delete(idORRef);
        } else {
            this._forces.delete(idORRef.id);
        }
    }

    calculateCenterOfMass(): Coord{
        return new Coord(0,0);
    }

    calculateLength(): number{
        return 0;
    }

    calculateAngle(): number{
        return 0;
    }

    setAngle(newAngle: number){

    }

    setLength(newLength: number){

    }

    containsJoint(idORRef: number | Joint):boolean{
        let id: number;
        if(typeof idORRef === 'number'){
            id = idORRef
        }else{
            id = idORRef.id;
        }

        if(this._joints.has(id)){
            return true;
        } else {
            return false;
        }
    }
    containsJoints(joints: Joint[]): Joint[]{
        let containedJoints: Joint[] = [];
        for(let joint of joints){
            if(this._joints.has(joint.id))
                containedJoints.push(joint);
        }


        return containedJoints;
    }
    containsForce(idORRef: number | Force):boolean{
        let id: number;
        if(typeof idORRef === 'number'){
            id = idORRef
        }else{
            id = idORRef.id;
        }
        if(this._forces.has(id)){
            return true;
        } else {
            return false;
        }
    }
    moveCoordinates( coord: Coord){
        for(const jointID of this._joints.keys()){
            const joint = this._joints.get(jointID)!;
            joint.setCoordinates(joint.coords.add(coord));
        }
        for(const forceID of this._forces.keys()){
            const force = this._forces.get(forceID)!;
            force.setCoordinates(force.start.add(coord), force.end.add(coord));
        }

    }


}