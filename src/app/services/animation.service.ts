import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { Joint, JointType } from '../model/joint';
import { Link, RigidBody } from '../model/link';
import { Coord } from '../model/coord';
import { KinematicSolverService } from './kinematic-solver.service';
import { Mechanism } from '../model/mechanism';
import { AnimationPositions } from './kinematic-solver.service';

export interface JointAnimationState {
    mechanismIndex: number,
    currentFrameIndex: number,
    totalFrames: number,
    isPaused: boolean,
    startingPositions: Coord[],
    jointIDs: number[],
    animationFrames: Coord[][],
    inputSpeed: number,
}


@Injectable({
    providedIn: 'root'
})
export class AnimationService {

    private animationStates: JointAnimationState[];
    private invaldMechanism: boolean;

    constructor(private stateService: StateService, private kinematicService: KinematicSolverService) {
        this.animationStates = new Array();
        this.invaldMechanism = true;
        this.stateService.getMechanismObservable().subscribe(updatedMechanism => {
            this.initializeAnimations();
        })
    }
    isInvalid(): boolean {
        return this.invaldMechanism;
    }

    initializeAnimations() {
        this.animationStates = new Array();
        let frames: AnimationPositions = this.kinematicService.solvePositions();

        for (let subMechanismIndex = 0; subMechanismIndex < frames.correspondingJoints.length; subMechanismIndex++) {
            //intialize animation states
            let mechanismIndex: number = subMechanismIndex,
                currentFrameIndex: number = 0,
                totalFrames: number = frames.positions[subMechanismIndex].length,
                isPaused: boolean = true,
                startingPositions: Coord[] = new Array(),
                jointIDs: number[] = new Array(),
                animationFrames: Coord[][] = frames.positions[subMechanismIndex],
                inputSpeed: number = this.stateService.getMechanism().getJoint(frames.correspondingJoints[subMechanismIndex][0]).inputSpeed;

            for (let jointIndex = 0; jointIndex < frames.correspondingJoints[subMechanismIndex].length; jointIndex++) {
                startingPositions.push(frames.positions[subMechanismIndex][jointIndex][0]);
                jointIDs.push(frames.correspondingJoints[subMechanismIndex][jointIndex])
            }
            this.animationStates.push({
                mechanismIndex: mechanismIndex,
                currentFrameIndex: currentFrameIndex,
                totalFrames: totalFrames,
                isPaused: isPaused,
                startingPositions: startingPositions,
                jointIDs: jointIDs,
                animationFrames: animationFrames,
                inputSpeed: inputSpeed
            })
        }
        this.invaldMechanism = this.animationStates.length == 0 ? true : false;
        console.log("animation states:\n");
        console.log(this.animationStates);
    }


    animateMechanisms(playPause: boolean) {
        console.log(`animating Mechanisms ${playPause}`);
        if (playPause == false) {
            for (let state of this.animationStates) {
                state.isPaused = true;
            }
        } else {
            for (let state of this.animationStates) {
                state.isPaused = false;
                this.singleMechanismAnimation(state);
            }
        }
    }

    singleMechanismAnimation(state: JointAnimationState) {
        //stop if paused
        if (state.isPaused) {
            return;
        } else {
            //get the index of the next frame
            if (state.currentFrameIndex == state.totalFrames - 1) {
                state.currentFrameIndex = 0;
            } else {
                state.currentFrameIndex++;
            }
            for (let jointIndex = 0; jointIndex < state.jointIDs.length; jointIndex++) {
                this.stateService.getMechanism().getJoint(state.jointIDs[jointIndex]).setCoordinates(state.animationFrames[state.currentFrameIndex][jointIndex]);
            }

            setTimeout(() => {
                this.singleMechanismAnimation(state)
            }, Math.round((1000 * 60) / (state.inputSpeed * 360)));
        }
    }


    reset() {
        for (let state of this.animationStates) {
            for (let jointIndex of state.jointIDs) {
                this.stateService.getMechanism().setXCoord(state.jointIDs[jointIndex], state.startingPositions[jointIndex].x);
                this.stateService.getMechanism().setYCoord(state.jointIDs[jointIndex], state.startingPositions[jointIndex].y);
            }
            state.isPaused = true;
            state.currentFrameIndex = 0;
        }
    }





}