import {Coord} from '../model/coord'
import {Joint} from '../model/joint'
import {Force} from '../model/force'

export class Link {
    private _id: number;
    private _name: string;
    private _mass: number;
    private _centerOfMass: Coord;
    private _joints: Map<number, Joint>;
    private _forces: Map<number, Force>;
    private _color: string = "";
    private _isLocked: boolean;

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

    constructor(id: number, jointA: Joint, jointB: Joint);
    constructor(id: number, joints: Joint[]);
    constructor(id: number, jointAORJoints: Joint | Joint[], jointB?: Joint){
        this._id = id;
        this._name = this._name = id as unknown as string;
        this._mass = 0;
        this._forces = new Map();
        this._joints = new Map();
        this._color = this.linkColorOptions[id % this.linkColorOptions.length];
        this._isLocked = false;

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

    get color(): string{
        return this._color;
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
    get locked(): boolean {
        return this._isLocked;
    }

    //setters
    set name(value: string) {
        this._name = value;
    }

    set mass(value: number) {
        this._mass = value;
    }

    set locked(value: boolean) {
        this._isLocked = value;
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

    // find the first two non-null joints of a link. Do pythagorean math to find length
    calculateLength(): number | null{
        // Get the first two non-empty keys from the joints map
        const jointKeys = Array.from(this.joints.keys()).filter(key => {
            const joint = this.joints.get(key);
            return joint !== null && joint !== undefined;
        }).slice(0, 2);

        // Retrieve the joints using the keys
        const jointOne = this.joints.get(jointKeys[0]);
        const jointTwo = this.joints.get(jointKeys[1]);
        if(jointOne && jointTwo) {
            let xDiff = Math.abs(jointOne?.coords.x - jointTwo?.coords.x);
            let yDiff = Math.abs(jointOne?.coords.y - jointTwo?.coords.y);
            let hypotenuse = (xDiff * xDiff) + (yDiff * yDiff);
            return Math.sqrt(hypotenuse);
        }
        else {
            return null;
        }
    }

    // find the first tow non-empty joints in map. Calculate angle between them
    // using trigonometry (arctan)
    calculateAngle(): number | null {
        // Get the first two non-empty keys from the joints map
        const jointKeys = Array.from(this.joints.keys()).filter(key => {
            const joint = this.joints.get(key);
            return joint !== null && joint !== undefined;
        }).slice(0, 2);

        // Retrieve the joints using the keys
        const jointOne = this.joints.get(jointKeys[0]);
        const jointTwo = this.joints.get(jointKeys[1]);

        if (jointOne && jointTwo) {
            // Calculate the differences in x and y coordinates
            const xDiff = jointTwo.coords.x - jointOne.coords.x;
            const yDiff = jointTwo.coords.y - jointOne.coords.y;

            // Calculate the angle using arctangent
            const angleInRadians = Math.atan2(yDiff, xDiff);

            // Convert the angle to degrees
            let angleInDegrees = angleInRadians * (180 / Math.PI);

            // Ensure the angle is in the range of +180 to -180 degrees
            if (angleInDegrees > 180) {
                angleInDegrees -= 360;
            } else if (angleInDegrees < -180) {
                angleInDegrees += 360;
            }

            return angleInDegrees;
        } else {
            // Handle the case where one or both joints are not found
            return null; // or throw an error, return NaN, or handle it based on your requirements
        }
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

    setColor(index: number){
        console.log(index);
        this._color=this.linkColorOptions[index];
        console.log(this._color);
    }





}
