import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { Joint, JointType } from '../model/joint';
import { Link, RigidBody } from '../model/link';


@Injectable({
    providedIn: 'root'
})
export class KinematicSolverService {
    constructor(private stateService:StateService){

    }
    getItems(){
        //first get the list of submechanisms to collect positions independently
        const subMechanisms: Map<Joint,RigidBody[]>[] = this.stateService.getMechanism().getSubMechanisms();
        const validMechanisms: Map<Joint,RigidBody[]>[] = new Array();
        //second, determine which submechanisms are valid and can be simulated
        for(let subMechanism of subMechanisms){
            if(this.isValidMechanism(subMechanism)){
                validMechanisms.push(subMechanism);
            }
        }
        //third determine solve order.

        for(let subMechanism of validMechanisms){

        }
        


        //fourth solve


    }
    isValidMechanism(subMechanism:Map<Joint,RigidBody[]>): boolean {
        //ensure only one input is present and grounded
        let isValid = true;
        let numberOfInputs = 0;
        for(let joint of subMechanism.keys()){
            if(joint.isInput){
                numberOfInputs++;
                if(joint.isGrounded == false){
                    isValid = false
                }
            }
        }
        if(numberOfInputs != 1){
            isValid = false;
        }
        //ensure the DOF is also 1.
        if(this.getDegreesOfFreedom(subMechanism) != 1)
        isValid = false;


        return isValid;
    }
    //Kutzback equation  + Grubler's Equation
    getDegreesOfFreedom(subMechanism:Map<Joint,RigidBody[]>): number {
        let N: number = 0; // number of links
        let J: number = 0; //counting full pair connections
        let links: Set<RigidBody> = new Set();
        for(let joint of subMechanism.keys()){
            for(let rigidBody of subMechanism.get(joint)!){
                links.add(rigidBody);
            }
            switch(joint.type){
                case JointType.Revolute:
                J += subMechanism.get(joint)!.length -1;
                if(joint.isGrounded){
                    J+= 1;
                }
                break;
                case JointType.Prismatic:
                N +=1;
                J += subMechanism.get(joint)!.length;
                break;
            }
        }
        N += links.size + 1; // +1 accounts for ground that is assumed
        return 3*(N -1 ) -2*J;
    }

    determineSolveOrder(subMechanism:Map<Joint,RigidBody[]>){
        // create array of joints in order to be solved and store unsolved joints
        let orderedJoints: Joint[] = new Array();
        let unsolvedJoints: Joint[] = new Array();
        //loop through joints, adding grounded joints, set input joint aside
        for(let joint of subMechanism.keys()){
            if(joint.isGrounded){
                orderedJoints.push(joint);
            }
            else{
                unsolvedJoints.push(joint);
            }
        }
        //continue to loop over joints that are not solved for, adding joints that can be solved for,
        while(unsolvedJoints.length != 0){
            
            for(let unsolvedJoint of unsolvedJoints){
                let connectedLinks = subMechanism.get(unsolvedJoint)!;
                if(this.jointCanBeSolved(unsolvedJoint,connectedLinks, orderedJoints)){
                    orderedJoints.push(unsolvedJoint);
                    unsolvedJoints.splice(unsolvedJoints.indexOf(unsolvedJoint), 1);
                }
            }
        }

    }
    jointCanBeSolved(joint: Joint, links: RigidBody[], solvedJoints: Joint[]): boolean {
        let canBeSolved = false;
        let numOfSolved: number = 0;
        for(let link of links){
            for(let joint of link.getJoints()){
                if(joint.isInput){
                    canBeSolved = true;
                }
                if(solvedJoints.includes(joint)){
                    numOfSolved++;
                }

            }
            
        }
        if(numOfSolved >1){
            canBeSolved = true;
        }
        return canBeSolved;
    }
    
    getPositions(){

    }

}



