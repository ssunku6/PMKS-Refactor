import {Coord} from '../model/coord'
import {Joint} from '../model/joint'
import {Force} from '../model/force'

export interface RigidBody{
    getJoints(): Joint[]

}

export class Link implements RigidBody{
    private _id: number;
    private _name: string;
    private _mass: number;
    private _centerOfMass: Coord;
    _joints: Map<number, Joint>;
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
        this._name = "";
        for(let joint of this._joints.values()){
            this._name += joint.name;
        }


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
      // ensures that the center of mass is always updating, specifically when adding tracer points is useful
        return this.calculateCenterOfMass();
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
        this.updateLocks(value);
    }

    addTracer(newJoint: Joint){
        this._joints.set(newJoint.id,newJoint);
        this.calculateCenterOfMass();
        this._name = "";
        for(let joint of this._joints.values()){
            this._name += joint.name;
        }
    }

    // update all of the locks i.e. subjoints need to lock when the link is locked,
    // and unlock when the link is unlocked
    updateLocks(value: boolean){
        console.log('Updating lock in link')
        this._joints.forEach((joint: Joint, key: number) => {
            joint.locked = value;
            console.log(`Joint ${key}: ${joint}`);
        });
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
        this._name = "";
        for(let joint of this._joints.values()){
            this._name += joint.name;
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
        let totalX = 0;
        let totalY = 0;

        // Iterate over each joint and accumulate x and y coordinates
        this._joints.forEach((joint) => {
            totalX += joint.coords.x;
            totalY += joint.coords.y;
        });

        // Calculate the mean (average) by dividing by the number of joints
        const numberOfJoints = this._joints.size;
        const centerX = totalX / numberOfJoints;
        const centerY = totalY / numberOfJoints;

        this._centerOfMass = new Coord(centerX, centerY);
        return this._centerOfMass;
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
            let vectorX = Math.abs(jointOne?.coords.x - jointTwo?.coords.x);
            let vectorY = Math.abs(jointOne?.coords.y - jointTwo?.coords.y);
            let hypotenuse = (vectorX * vectorX) + (vectorY * vectorY);
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
            const vectorX = jointTwo.coords.x - jointOne.coords.x;
            const vectorY = jointTwo.coords.y - jointOne.coords.y;

            // Calculate the angle using arctangent
            const angleInRadians = Math.atan2(vectorY, vectorX);

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

    // set length uses vector scaling to set the new distance at the same angle
    setLength(newLength: number, refJoint: Joint) {
      // Get the first two non-empty keys from the joints map
      const jointKeys = Array.from(this.joints.keys()).filter(key => {
        const joint = this.joints.get(key);
        return joint !== null && joint !== undefined;
      }).slice(0, 2);

      // Retrieve the joints using the keys
      let jointOne = this.joints.get(jointKeys[0]);
      let jointTwo = this.joints.get(jointKeys[1]);

      // Calculate the current length
      const currentLength = this.calculateLength();

      if (jointOne && jointTwo && currentLength) {

        // handle the reference joint ID not being the first joint
        if(refJoint.id == jointTwo.id){
          let placeholderJoint = jointOne;
          jointOne = jointTwo;
          jointTwo = placeholderJoint;
        }

        // dont manipulate locked joints
        if(jointOne.locked || jointTwo.locked){
          return;
        }

        // Calculate the scaling factor to achieve the new length
        const scalingFactor = newLength / currentLength;

        // Calculate the vector between the two joints
        const vectorX = jointTwo.coords.x - jointOne.coords.x;
        const vectorY = jointTwo.coords.y - jointOne.coords.y;

        // Scale the vector
        const scaledVectorX = vectorX * scalingFactor;
        const scaledVectorY = vectorY * scalingFactor;

        // Update the coordinates of jointTwo to achieve the new length
        jointTwo.coords.x = jointOne.coords.x + scaledVectorX;
        jointTwo.coords.y = jointOne.coords.y + scaledVectorY;

      }
    }

    // set angle uses trig to caluclate the new x and y coordinates along the same distance
    setAngle(newAngle: number, refJoint: Joint){
      // Get the first two non-empty keys from the joints map
      const jointKeys = Array.from(this.joints.keys()).filter(key => {
        const joint = this.joints.get(key);
        return joint !== null && joint !== undefined;
      }).slice(0, 2);

      // Retrieve the joints using the keys
      let jointOne = this.joints.get(jointKeys[0]);
      let jointTwo = this.joints.get(jointKeys[1]);

      // if the value of current angle is 0, program breaks, so add a miniscule amount to it
      const currentAngle = (this.calculateAngle() as number) + 0.000000001;
      const currentDistance = this.calculateLength();
      if (jointOne && jointTwo && currentAngle && currentDistance) {

        // handle the reference joint ID not being the first joint
        if(refJoint.id == jointTwo.id){
          let placeholderJoint = jointOne;
          jointOne = jointTwo;
          jointTwo = placeholderJoint;
        }

        // dont manipulate locked joints
        if(jointOne.locked || jointTwo.locked){
          return;
        }


        // Calculate the angle difference
        const angleDifference = newAngle - currentAngle;

        // Convert currentAngle to radians
        const currentAngleInRadians = (currentAngle * Math.PI) / 180;

        // Calculate the new angle in radians
        let angleInRadians = (angleDifference * Math.PI) / 180;

        // Calculate the new coordinates of jointTwo
        const newX = jointOne.coords.x + currentDistance * Math.cos(currentAngleInRadians + angleInRadians);
        const newY = jointOne.coords.y + currentDistance * Math.sin(currentAngleInRadians + angleInRadians);

        // Update the coordinates of jointTwo
        jointTwo.coords.x = newX;
        jointTwo.coords.y = newY;
      }
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

    getJoints(): Joint[] {
        return Array.from(this._joints.values());
    }
    setColor(index: number){
        console.log(index);
        this._color=this.linkColorOptions[index];
        console.log(this._color);
    }


}

export class Piston extends Link {
  constructor(id: number, jointA: Joint, jointB: Joint) {
    super(id, jointA, jointB);
  }
}

// export class RealLink extends Link {
//   private _fill: string = 'Set Later';
//   // private _shape: Shape; //Shape is the shape of the link
//   // private _bound: Bound; //The rectengualr area the link is encompassed by
//   private _d: string; //SVG path
//   // private _mass: number;
//
//   private _massMoI: number; //The value passed in from the linakge table
//   private _CoM: Coord; //Same passed in from the linkage table
//   private _CoM_d1: string = ''; //
//   private _CoM_d2: string = '';
//   private _CoM_d3: string = '';
//   private _CoM_d4: string = '';
//
//   private _length: number = 0;
//   private _angle: number = 0;
//   private _subset: Link[] = []; // this is not connectedLinks but links that make up this link
//
//   public externalLines: Line[] = [];
//
//   public initialExternalLines: Line[] = [];
//
//   //For debugging:
//   public unqiqueRandomID: string =
//     Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
//
//   // TODO: Have an optional argument of forces
//
//   public static debugDesiredJointsIDs: any;
//   public renderError: boolean = true;
//   public lastSelectedSublink: Link | null = null;
//
//   constructor(
//     id: string,
//     joints: Joint[],
//     mass?: number,
//     massMoI?: number,
//     CoM?: Coord,
//     subSet?: Link[]
//   ) {
//     super(id, joints, mass);
//
//     // SettingsService.objectScale.subscribe((value) => {
//     //   this._d = RealLink.getD(this.joints);
//     //   //TODO: Unsubsribe from this when link gets deleted
//     // });
//     // console.log('new subscription');
//     // this._mass = mass !== undefined ? mass : 1;
//     this._massMoI = massMoI !== undefined ? massMoI : 1;
//     // this._shape = shape !== undefined ? shape : Shape.line;
//     // this._fill = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
//     // this._fill = RealLink.colorOptions[Math.floor(Math.random() * RealLink.colorOptions.length)];
//     // setTimeout(() => {
//     // this._fill = ColorService.instance.getNextLinkColor();
//     // });
//     this._fill = '#555555'; //Set later
//
//     if (subSet === undefined || subSet.length === 0) {
//       // this.subset = [];
//     } else {
//       this.subset = subSet;
//     }
//     this._CoM = CoM !== undefined ? CoM : RealLink.determineCenterOfMass(joints);
//     this._d = this.getPathString();
//     // TODO: When you insert a joint onto a link, be sure to utilize this function call
//     this.updateCoMDs();
//     this.updateLengthAndAngle();
//   }
//
//   public reComputeDPath() {
//     this._d = this.getPathString();
//     this._CoM = RealLink.determineCenterOfMass(this.joints);
//     this.updateCoMDs();
//   }
//
//   updateLengthAndAngle() {
//     this._length = getDistance(this.joints[0], this.joints[1]);
//     this._angle = getAngle(this.joints[0], this.joints[1]);
//     // console.warn(this._length, this._angle);
//   }
//
//   solveForExternalLines(linkSubset: RealLink[]) {
//     linkSubset.forEach((l) => {
//       l.reComputeDPath();
//     });
//
//     //Populate the parentLink of each external line
//     linkSubset.forEach((link) => {
//       link.externalLines.forEach((line) => {
//         line.parentLink = link;
//       });
//     });
//
//     //create a list of all the external lines of all links in the subset using reduce()
//     let externalLines: Line[] = linkSubset.reduce((acc: Line[], link) => {
//       return acc.concat(link.externalLines);
//     }, []);
//
//     if (externalLines.length === 0) {
//       this.renderError = true;
//       return [];
//     }
//
//     let breakOutCounter = 10000;
//     //For each external line, check for intersections with all other external lines
//     for (let i1 = 0; i1 < externalLines.length; i1++) {
//       const line = externalLines[i1];
//       for (let i = 0; i < externalLines.length; i++) {
//         if (breakOutCounter-- < 0) {
//           console.error('breakOutCounter');
//           this.renderError = true;
//           return [];
//         }
//         const line2 = externalLines[i];
//         if (line === line2) continue;
//         //If the lines intersect, split the line into two lines
//         let count = 0;
//         while (count < 10) {
//           const intersection = line.intersectsWith(line2);
//           if (!intersection) break;
//           const newLine = line.splitAt(intersection);
//           const newLine2 = line2.splitAt(intersection);
//           if (newLine) {
//             line.parentLink?.externalLines.push(newLine);
//             externalLines.push(newLine);
//           }
//           if (newLine2) {
//             line2.parentLink?.externalLines.push(newLine2);
//             externalLines.push(newLine2);
//           }
//           count++;
//         }
//       }
//     }
//
//     //We need to find duplicate lines for later
//     let duplicateLines: Line[] = [];
//     for (const line of externalLines) {
//       const duplicateFound = externalLines.find((line2) => {
//         return line !== line2 && line2.equals(line);
//       });
//       const inDuplicateLines = duplicateLines.find((line2) => {
//         return line2.equals(line);
//       });
//       if (duplicateFound && !inDuplicateLines) {
//         duplicateLines.push(line);
//       }
//     }
//
//     // If the line is fully inside another link, then remove it
//     externalLines = externalLines.filter((line) => {
//       return !linkSubset.some((link) => {
//         if (link === line.parentLink) return false;
//         return isLineFullyInside(line, link);
//       });
//     });
//
//     // Duplicate lines are only added if we deteced a gap in the path
//     // Check each external line's endpoint, if there is no other line that starts at that point, then we need to add a duplicate line to close the gap
//     const newLinesToAdd = [];
//     for (let i = 0; i < externalLines.length; i++) {
//       const pointToSearch = externalLines[i].endPosition;
//       const found = externalLines.find((line2) => {
//         return line2.startPosition.equals(pointToSearch);
//       });
//       if (!found) {
//         const lineToAdd = duplicateLines.find((line2) => line2.startPosition.equals(pointToSearch));
//         if (lineToAdd) {
//           newLinesToAdd.push(lineToAdd);
//         }
//       }
//     }
//     externalLines.push(...newLinesToAdd);
//
//     //Remove very short lines
//     externalLines = externalLines.filter((line) => {
//       return (
//         line.startPosition.getDistanceTo(line.endPosition) > 0.0036 * SettingsService.objectScale
//       );
//     });
//
//     //As a final step, we need to remove one of the duplicate lines from each pair
//     let returnExternalLines: Line[] = [];
//     externalLines.forEach((line) => {
//       if (returnExternalLines.find((line2) => line2.equals(line))) return;
//       returnExternalLines.push(line);
//     });
//
//     return returnExternalLines;
//
//     function isPointInsideLink(startPosition: Coord, link: RealLink) {
//       //Check if the point is inside of the shape created by the lines
//       //First, draw a line that is infinitely long and check if it intersects with the shape an odd number of times
//       const infiniteLine = new Line(startPosition, new Coord(10000, startPosition.y));
//
//       let intersections = 0;
//       link.initialExternalLines.forEach((line) => {
//         const intersectionPoint = infiniteLine.intersectsWith(line);
//         const otherIntersectionPoint = infiniteLine.clone().reverse().intersectsWith(line);
//
//         //Add two to the intersection count if intersectionPoint and otherIntersectionPoint are not equal
//         if (intersectionPoint && otherIntersectionPoint) {
//           if (!intersectionPoint.equals(otherIntersectionPoint)) {
//             intersections += 2;
//           } else {
//             intersections += 1;
//           }
//         } else if (intersectionPoint || otherIntersectionPoint) {
//           intersections += 1;
//         }
//       });
//
//       //If the number of intersections is odd, then the point is inside the shape
//       return intersections % 2 === 1;
//     }
//
//     function isLineFullyInside(line: Line, link: RealLink): boolean {
//       const tempShortenedLine = line.clone().shorten(0.02 * SettingsService.objectScale);
//
//       //First we need to check if both endpoints of the line are inside the link
//       if (
//         isPointInsideLink(tempShortenedLine.startPosition, link) &&
//         isPointInsideLink(tempShortenedLine.endPosition, link)
//       ) {
//         //If both endpoints are inside the link, then we need to check if the line is fully inside the link
//         //To do this, we will check if the line intersects with any of the lines of the link
//         return true;
//         // return !link.externalLines.some((linkLine) => {
//         //   return linkLine.intersectsWith(line);
//         // });
//       }
//       return false;
//     }
//   }
//
//   getCompoundPathString() {
//     this.renderError = false;
//     const linkSubset: RealLink[] = this.subset as RealLink[];
//
//     //This is a very long function that returns the full external clockwise path for the combined shape
//     this.externalLines = this.solveForExternalLines(linkSubset);
//
//     //If there are no external lines to draw, then return an empty string
//     if (this.externalLines.length === 0) {
//       this.renderError = true;
//       return '';
//     }
//
//     // Shorten all lines (uncomment block for visual debugging)
//     // for (let line of this.externalLines) {
//     //   line = line.shorten(0.5);
//     // }
//     NewGridComponent.debugPoints = [];
//     NewGridComponent.debugValue = [];
//     NewGridComponent.debugLines = this.externalLines;
//
//     //Convert external lines to a set so we can keep track of which lines have been used
//     const externalLinesSet = new Set(this.externalLines);
//
//     let pathString = '';
//
//     let timeoutCounter = 1000;
//
//     while (externalLinesSet.size > 1) {
//       //Pick the first line from the set
//       let currentLine: Line = externalLinesSet.values().next().value;
//
//       let veryFirstPoint = currentLine.endPosition.clone();
//       while (!currentLine.endPosition.equals(veryFirstPoint) || isNewShape(pathString)) {
//         if (timeoutCounter-- < 0) {
//           console.log('Timeout');
//           this.renderError = true;
//           return pathString;
//         }
//         //Find the next line that starts at the end of the current line
//         const nextLine = [...externalLinesSet].find((line) => {
//           return line.startPosition.looselyEquals(currentLine.endPosition);
//         });
//
//         if (!nextLine) break;
//         externalLinesSet.delete(nextLine);
//
//         if (
//           //When there are two lines intersecting, create a fillet between them
//           !currentLine.isArc &&
//           !nextLine.isArc &&
//           //If the angle between the two lines. Wrap to -pi to pi. Then check if abs(angle) is less than 90 degrees
//           Math.abs(wrapAngle(nextLine.angle - currentLine.angle)) > degToRad(10) &&
//           1
//         ) {
//           let [currentLineOffsetPoint, nextLineOffsetPoint, radius] =
//             this.computeArcPointsAndRadius(currentLine, nextLine, SettingsService.objectScale);
//
//           currentLine.endPosition = currentLineOffsetPoint;
//           nextLine.startPosition = nextLineOffsetPoint;
//
//           if (isNewShape(pathString)) {
//             pathString += 'M ' + currentLine.endPosition.x + ' ' + currentLine.endPosition.y + ' ';
//           } else {
//             pathString += currentLine.toPathString();
//           }
//
//           pathString += getArcPathString(nextLine.startPosition, radius);
//         } else {
//           //Otherwise, just draw a line between the two points
//           if (isNewShape(pathString)) {
//             pathString += 'M ' + currentLine.endPosition.x + ' ' + currentLine.endPosition.y + ' ';
//           } else {
//             pathString += currentLine.toPathString();
//           }
//         }
//         currentLine = nextLine;
//       }
//       pathString += currentLine.toPathString();
//       pathString += 'Z ';
//     }
//     return pathString;
//   }
//
//   private computeArcPointsAndRadius(
//     currentLine: Line,
//     nextLine: Line,
//     desiredArcRadius: number
//   ): [Coord, Coord, number] {
//     //We can modify the currentLine.endPosition and nextLine.startPosition to draw an arc between them
//     const arcOffset = Math.min(desiredArcRadius, currentLine.length / 2, nextLine.length / 2);
//     //Find the offsetPoint for the currentLine, which is arcOffset units away from the end of the line towards the start of the line
//     const currentLineOffsetPoint = currentLine.startPosition
//       .clone()
//       .subtract(currentLine.endPosition)
//       .normalize()
//       .multiply(arcOffset)
//       .add(currentLine.endPosition);
//
//     //Find the offsetPoint for the nextLine, which is arcOffset units away from the start of the line towards the end of the line
//     const nextLineOffsetPoint = nextLine.endPosition
//       .clone()
//       .subtract(nextLine.startPosition)
//       .normalize()
//       .multiply(arcOffset)
//       .add(nextLine.startPosition);
//
//     NewGridComponent.debugPoints.push(currentLineOffsetPoint);
//     NewGridComponent.debugPoints.push(nextLineOffsetPoint);
//
//     //Find the angle between the two lines
//     const angleBetweenLines = nextLine.angle - currentLine.angle;
//     NewGridComponent.debugValue = radToDeg(angleBetweenLines).toFixed(2);
//     const radius = arcOffset * Math.tan((Math.PI - angleBetweenLines) / 2);
//
//     return [currentLineOffsetPoint, nextLineOffsetPoint, radius];
//   }
//
//   getPathString(): string {
//     const link = this as RealLink;
//     // console.error('Get path string called');
//     if (link.subset.length == 0) {
//       // console.log('Simple path starting for ' + link.id, link);
//       return link.getSimplePathString();
//     } else {
//       // console.log('Compound path starting for ' + link.id, link);
//       return link.getCompoundPathString();
//     }
//   }
//
//   getHullPoints(): number[][] {
//     const allJoints = this.joints;
//
//     //Convert joints to simple x, y array
//     const points = allJoints.map((j) => [j.x, j.y]);
//     return hull(points, Infinity);
//   }
//
//   // whether (x,y) is inside the hull. To calculate this, create a new
//   // hull with the point added to allJoints, and determine if the new hull
//   // contains the added (x,y) point
//   isPointInsideHull(x: number, y: number): boolean {
//     let points = this.joints.map((j) => [j.x, j.y]);
//     points.push([x, y]);
//     const hullPoints = hull(points, Infinity);
//
//     let hullContainsPoint = false;
//     hullPoints.forEach((point: any) => {
//       if (point[0] === x && point[1] === y) {
//         hullContainsPoint = true;
//       }
//     });
//
//     return !hullContainsPoint;
//   }
//
//   getSimplePathString(): string {
//     this.externalLines = [];
//     let l = this;
//     // Draw link given the desiredJointIDs
//     const allJoints = l.joints;
//
//     //Convert joints to simple x, y array
//     const points = allJoints.map((j) => [j.x, j.y]);
//     const hullPoints = hull(points, Infinity); //Hull points find the convex hull (largest fence)
//
//     //Match resuling x,y points to joints
//     let desiredJointsIDs: string = '';
//     hullPoints.forEach((point: any) => {
//       const joint = allJoints.find((j) => j.x === point[0] && j.y === point[1]);
//       if (joint) desiredJointsIDs += joint.id;
//     });
//
//     //Cut off the last once since it is the same as the first
//     desiredJointsIDs = desiredJointsIDs.substring(0, desiredJointsIDs.length - 1);
//
//     //This is just for debugging display
//     // l.debugDesiredJointsIDs = desiredJointsIDs;
//     // RealLink.debugDesiredJointsIDs = desiredJointsIDs;
//
//     const jointIDtoIndex = new Map<string, number>();
//     allJoints.forEach((j, ind) => {
//       jointIDtoIndex.set(j.id, ind);
//     });
//
//     let width: number = SettingsService.objectScale / 4;
//     let d = '';
//
//     let clockWise = 'Will be set later';
//
//     let j: number;
//     for (let i = 0; i < desiredJointsIDs.length; i++) {
//       j = (i + 1) % desiredJointsIDs.length;
//       if (desiredJointsIDs.length === 2) {
//         const [updatedD, newLines] = determineL(
//           d,
//           allJoints[jointIDtoIndex.get(desiredJointsIDs[i])!],
//           allJoints[jointIDtoIndex.get(desiredJointsIDs[j])!]
//         );
//         d = updatedD;
//         this.externalLines = this.externalLines.concat(newLines);
//       } else {
//         const k = (i + 2) % desiredJointsIDs.length;
//         const [updatedD, newLines] = determineL(
//           d,
//           allJoints[jointIDtoIndex.get(desiredJointsIDs[i])!],
//           allJoints[jointIDtoIndex.get(desiredJointsIDs[j])!],
//           allJoints[jointIDtoIndex.get(desiredJointsIDs[k])!]
//         );
//         d = updatedD;
//         this.externalLines = this.externalLines.concat(newLines);
//       }
//     }
//
//     const splitPath = d.split(' ');
//
//     //Get the final joint
//     const finalJoint = allJoints[jointIDtoIndex.get(desiredJointsIDs[j!])!];
//     let lastPos = this.externalLines[this.externalLines.length - 1].endPosition;
//     let startPos = this.externalLines[0].startPosition;
//     lastPos = new Coord(lastPos.x, lastPos.y);
//     startPos = new Coord(startPos.x, startPos.y);
//     d +=
//       ' A ' +
//       width.toString() +
//       ' ' +
//       width.toString() +
//       ' 0 0 ' +
//       clockWise +
//       ' ' +
//       startPos.x +
//       ' ' +
//       startPos.y;
//
//     this.externalLines.push(new Arc(lastPos, startPos, finalJoint));
//
//     if (!RealLink.isClockwise(this.externalLines[0], this.CoM)) {
//       // console.log('Link is not clockwise');
//       this.externalLines.reverse();
//       //If the link is not clockwise, reverse the order of the external lines
//       for (let i = 0; i < this.externalLines.length; i++) {
//         const line = this.externalLines[i];
//         //Swap start and end positions
//         const temp = line.startPosition;
//         line.startPosition = line.endPosition;
//         line.endPosition = temp;
//         line.resetInitialPosition();
//       }
//     }
//
//     //Now set the next external line for each line
//     this.externalLines.forEach((line, ind) => {
//       const nextLine = this.externalLines[(ind + 1) % this.externalLines.length];
//       line.next = nextLine;
//     });
//
//     this.initialExternalLines = this.externalLines.map((line) => line.clone());
//
//     d += ' Z ';
//     this.renderError = false;
//
//     return d;
//
//     function determineL(d: string, coord1: Joint, coord2: Joint, coord3?: Joint): [string, Line[]] {
//       // find slope between two points
//       const m = determineSlope(coord1.x, coord1.y, coord2.x, coord2.y);
//       // find normal slope of given slope
//       let normal_m: number;
//       if (m === 0) {
//         normal_m = 99999;
//       } else {
//         normal_m = -1 / m;
//       }
//
//       const normal_angle = Math.atan(normal_m); // in degrees
//
//       // determine the point further away from third point
//       let point1: Coord;
//       let point2: Coord;
//
//       // TODO: think of better way to create this more universally
//
//       if (coord3 === undefined) {
//         if (d === '') {
//           [point1, point2] = determinePoint(normal_angle, coord1, coord2, 'neg');
//         } else {
//           [point1, point2] = determinePoint(normal_angle, coord1, coord2, 'pos');
//         }
//       } else {
//         const [point1a, point1b] = determinePoint(normal_angle, coord1, coord2, 'pos');
//         const point1c = new Coord((point1a.x + point1b.x) / 2, (point1a.y + point1b.y) / 2);
//         const [point2a, point2b] = determinePoint(normal_angle, coord1, coord2, 'neg');
//         const point2c = new Coord((point2a.x + point2b.x) / 2, (point2a.y + point2b.y) / 2);
//
//         if (getDistance(coord3, point1c) > getDistance(coord3, point2c)) {
//           [point1, point2] = [point1a, point1b];
//         } else {
//           [point1, point2] = [point2a, point2b];
//         }
//       }
//
//       const returnLines: Line[] = [];
//
//       if (d === '') {
//         clockWise = coord1.y > point1.y ? '1' : '0';
//         if (allJoints.length > 3) {
//           clockWise = clockWise == '1' ? '0' : '1';
//         }
//         d += 'M ' + point1.x.toString() + ' ' + point1.y.toString();
//         d += ' L ' + point2.x.toString() + ' ' + point2.y.toString();
//         returnLines.push(new Line(point1, point2));
//       } else {
//         // The end position is being inserted here
//         // Get the last position by splitting the string
//         const splitPath = d.split(' ');
//         const lastX = splitPath[splitPath.length - 2];
//         const lastY = splitPath[splitPath.length - 1];
//         const lastPosition = new Coord(Number(lastX), Number(lastY));
//         d +=
//           ' A ' +
//           width.toString() +
//           ' ' +
//           width.toString() +
//           ' 0 0 ' +
//           clockWise +
//           ' ' +
//           point1.x.toString() +
//           ' ' +
//           point1.y.toString();
//         d += ' L ' + point2.x.toString() + ' ' + point2.y.toString();
//         //Get the current joint we are arcing around
//         const currentJoint = allJoints[jointIDtoIndex.get(coord1.id)!];
//         returnLines.push(new Arc(lastPosition, point1, currentJoint));
//         returnLines.push(new Line(point1, point2));
//       }
//       return [d, returnLines];
//
//       function determinePoint(angle: number, c1: Coord, c2: Coord, dir: string) {
//         // Maybe it is atan2 that is desired...
//         if (dir === 'neg') {
//           return [
//             new Coord(
//               width * Math.cos(angle + Math.PI) + c1.x,
//               width * Math.sin(angle + Math.PI) + c1.y
//             ),
//             new Coord(
//               width * Math.cos(angle + Math.PI) + c2.x,
//               width * Math.sin(angle + Math.PI) + c2.y
//             ),
//           ];
//         } else {
//           return [
//             new Coord(width * Math.cos(angle) + c1.x, width * Math.sin(angle) + c1.y),
//             new Coord(width * Math.cos(angle) + c2.x, width * Math.sin(angle) + c2.y),
//           ];
//         }
//       }
//     }
//   }
//
//   static isClockwise(l: Line, center: Coord) {
//     const lineStart: Coord = l.startPosition;
//     const lineEnd: Coord = l.endPosition;
//
//     const vectorStartToCenter = {
//       x: center.x - lineStart.x,
//       y: center.y - lineStart.y,
//     };
//
//     const vectorEndToCenter = {
//       x: center.x - lineEnd.x,
//       y: center.y - lineEnd.y,
//     };
//
//     const crossProduct =
//       vectorStartToCenter.x * vectorEndToCenter.y - vectorStartToCenter.y * vectorEndToCenter.x;
//
//     return crossProduct > 0;
//   }
//
//   // static getLineIntersection(thisLine: Line, nextLine: Line): Coord | null {
//   //   const [x, y] = line_intersect(
//   //     thisLine.startPosition.x,
//   //     thisLine.startPosition.y,
//   //     thisLine.endPosition.x,
//   //     thisLine.endPosition.y,
//   //     nextLine.startPosition.x,
//   //     nextLine.startPosition.y,
//   //     nextLine.endPosition.x,
//   //     nextLine.endPosition.y
//   //   );
//   //   if (x === null || y === null) {
//   //     return null;
//   //   }
//   //   return new Coord(x, y);
//   // }
//
//   static determineCenterOfMass(joints: Joint[]) {
//     let com_x = 0;
//     let com_y = 0;
//     // TODO: Logic isn't exactly right but can change this once other logic is fully finished
//     joints.forEach((j) => {
//       com_x += j.x;
//       com_y += j.y;
//     });
//     return new Coord(com_x / joints.length, com_y / joints.length);
//   }
//
//   get d(): string {
//     return this._d;
//   }
//
//   set d(value: string) {
//     this._d = value;
//   }
//
//   get length(): number {
//     return this._length;
//   }
//
//   set length(value: number) {
//     this._length = value;
//   }
//
//   get angleRad(): number {
//     return this._angle;
//   }
//
//   set angleRad(value: number) {
//     this._angle = value;
//   }
//
//   get angleDeg(): number {
//     return radToDeg(this._angle);
//   }
//
//   set angleDeg(value: number) {
//     this._angle = degToRad(value);
//   }
//
//   get fill(): string {
//     return this._fill;
//   }
//
//   set fill(value: string) {
//     this._fill = value;
//   }
//
//   get massMoI(): number {
//     return this._massMoI;
//   }
//
//   set massMoI(value: number) {
//     this._massMoI = value;
//   }
//
//   get CoM(): Coord {
//     return this._CoM;
//   }
//
//   set CoM(value: Coord) {
//     this._CoM = value;
//   }
//
//   get CoM_d1(): string {
//     return this._CoM_d1;
//   }
//
//   set CoM_d1(value: string) {
//     this._CoM_d1 = value;
//   }
//
//   get CoM_d2(): string {
//     return this._CoM_d2;
//   }
//
//   set CoM_d2(value: string) {
//     this._CoM_d2 = value;
//   }
//
//   get CoM_d3(): string {
//     return this._CoM_d3;
//   }
//
//   set CoM_d3(value: string) {
//     this._CoM_d3 = value;
//   }
//
//   get CoM_d4(): string {
//     return this._CoM_d4;
//   }
//
//   set CoM_d4(value: string) {
//     this._CoM_d4 = value;
//   }
//
//   get isWelded(): boolean {
//     return this.subset.length >= 1;
//   }
//
//   updateCoMDs() {
//     //This is such a bad way of doing this. Just import the SVG file from the assets folder and use that instead of constructing the exact same thing every time.
//     const radius = SettingsService.objectScale * 0.2;
//     this._CoM_d1 =
//       'M' +
//       this.CoM.x +
//       ' ' +
//       this.CoM.y +
//       ' ' +
//       (this.CoM.x - radius) +
//       ' ' +
//       this.CoM.y +
//       ' ' +
//       `A ${radius} ${radius} 0 0 0 ` +
//       this.CoM.x +
//       ' ' +
//       (this.CoM.y + radius);
//     this._CoM_d2 =
//       'M' +
//       this.CoM.x +
//       ' ' +
//       this.CoM.y +
//       ' ' +
//       this.CoM.x +
//       ' ' +
//       (this.CoM.y + radius) +
//       ' ' +
//       `A ${radius} ${radius} 0 0 0` +
//       (this.CoM.x + radius) +
//       ' ' +
//       this.CoM.y;
//     this._CoM_d3 =
//       'M' +
//       this.CoM.x +
//       ' ' +
//       this.CoM.y +
//       ' ' +
//       (this.CoM.x + radius) +
//       ' ' +
//       this.CoM.y +
//       ' ' +
//       `A ${radius} ${radius} 0 0 0 ` +
//       this.CoM.x +
//       ' ' +
//       (this.CoM.y - radius);
//     this._CoM_d4 =
//       'M' +
//       this.CoM.x +
//       ' ' +
//       this.CoM.y +
//       ' ' +
//       this.CoM.x +
//       ' ' +
//       (this.CoM.y - radius) +
//       ' ' +
//       `A ${radius} ${radius} 0 0 0 ` +
//       (this.CoM.x - radius) +
//       ' ' +
//       this.CoM.y;
//   }
//
//   get subset(): Link[] {
//     return this._subset;
//   }
//
//   get isCompound(): boolean {
//     return this._subset.length > 0;
//   }
//
//   set subset(value: Link[]) {
//     this._subset = value;
//   }
// }
