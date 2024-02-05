import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { Joint } from '../model/joint';
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



        return isValid;
    }

    getDegreesOfFreedom(subMechanism:Map<Joint,RigidBody[]>): number {





        return 0;
    }

    




}