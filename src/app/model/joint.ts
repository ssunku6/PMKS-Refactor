import { Coord } from '../model/coord'

export enum JointType{
    Prismatic,
    Revolute
}

export class Joint {
    private _id: number;
    private _name: string;
    public _coords: Coord;
    private _type: JointType;
    private _angle: number;
    private _isGrounded: boolean;
    private _isInput: boolean;
    private _inputSpeed: number;
    private _isWelded: boolean;



    constructor(id: number, x: number, y: number);
    constructor(id: number, coord: Coord);
    constructor(id: number, xORCoord: number | Coord, y?: number){
        this._id = id;
        this._name = '';
        this._type = JointType.Revolute;
        this._angle = 0;
        this._isGrounded = false;
        this._isInput = false;
        this._isWelded = false;
        this._inputSpeed = 0;

        if(typeof xORCoord === 'number' && y !== undefined)
        {
            this._coords = new Coord(xORCoord,y);

        } else if(typeof xORCoord === 'object'){
            this._coords = new Coord(xORCoord.x,xORCoord.y);
        } else {
            throw new Error("Invalid Constructor Parameters");
        }
    }
    //----------------------------getters----------------------------
    get id(): number{
        return this._id;
    }

    get name(): string{
        return this._name;
    }

    get coords(): Coord{
        return this._coords;
    }

    get type(): JointType{
        return this._type;
    }
    get angle(): number{
        return this.angle;
    }

    get isGrounded(): boolean{
        return this._isGrounded;
    }
    get isInput(): boolean{
        return this._isInput;
    }

    get inputSpeed(): number{
        return this._inputSpeed;
    }

    get isWelded(): boolean{
        return this._isWelded;
    }
    //----------------------------setters----------------------------
    set name(newName: string){
        this._name = newName;
    }

    set angle(newAngle: number){
        this._angle = newAngle % 360;
    }

    set speed(newSpeed: number){
        this._inputSpeed = newSpeed;
    }

    //----------------------------Joint Modification without modifying other variables----------------------------
    addGround(){
        if(this._isWelded == false){
            throw new Error("Cannot Ground a Welded Joint");

        }else if(this._type == JointType.Prismatic){
            throw new Error("Cannot Ground a Prismatic Joint");

        }else{
            this._isGrounded = true;
        }    
    }

    removeGround(){
        if(this._isInput == true){
            throw new Error("Input Joint must be Grounded");
        } else{

            this._isGrounded = false;
        }
    }
    addInput(){
        if(this._isGrounded == false && this._type == JointType.Revolute){
            throw new Error("Input Joint must be Grounded or Prismatic");

        } else{
            this._isInput = true;
        }
    }

    removeInput(){
        this._isInput = false;
    }

    addWeld(){
        if(this._isInput == true){
            throw new Error("Cannot Weld Input Joint");

        } else if (this._isGrounded == true){
            throw new Error("Cannot Weld Grounded Joint");

        } else if(this._type == JointType.Prismatic){
            throw new Error("Cannot Weld Prismatic Joint");

        } else{
            this._isWelded = true;
        }
    }

    removeWeld(){
        this._isWelded = false;
    }

    addSlider(){
        if(this._isGrounded == true){
            throw new Error("Grounded Joints cannot be Prismatic");

        }else if(this._isWelded == true){
            throw new Error("Welded Joints cannot be Prismatic");

        }else{
            this._type = JointType.Prismatic;
        }
    }

    removeSlider(){
        if(this._isInput == true){
            throw new Error("Input Joints cannot be Revolute unless Grounded");
        }
        this._type = JointType.Revolute;
    }





    //----------------------------Joint Modification Querying----------------------------
    canAddGround(): boolean {
        if(this._isWelded == true){
            return false;

        }else if(this._type == JointType.Prismatic){
            return false;

        }else{
            return true;
        }    
    }

    canRemoveGround(): boolean {
        if(this._isInput == true){
            return false;
        } else{
            return true;
        }
    }

    canAddInput(): boolean {
        if(this._isGrounded == false && this._type == JointType.Revolute){
            return false;
        } else{
            return true;
        }
    }

    canRemoveInput(): boolean {
        return true;
    }

    canAddWeld(): boolean {
        if(this._isInput == true){
            return false;

        } else if (this._isGrounded == true){
            return false;

        } else if(this._type == JointType.Prismatic){
            return false;

        } else{
            return true;
        }
    }

    canRemoveWeld(): boolean {
        return true;
    }

    canAddSlider(): boolean {
        if(this._isGrounded == true){
            return false;

        }else if(this._isWelded == true){
            return false;

        }else{
            return true;
        }
    }
    canRemoveSlider(): boolean {
        if(this._isInput == true){
            return false;
        }
        return true;
    }
    //----------------------------Joint Alteration Relative to other Joints----------------------------
    setDistancetoJoint(newDistance: number, jointRef: Joint){

    }

    setAngletoJoint(newDistance: number, jointRef: Joint){

    }

    setCoordinates(coord: Coord){
        this._coords = coord;

    }


}

