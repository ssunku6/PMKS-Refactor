import { Component } from '@angular/core'
import { StateService } from 'src/app/services/state.service';
import { AnimationService } from 'src/app/services/animation.service';



@Component({
    selector: 'app-animation-bar',
    templateUrl: './animation-bar.component.html',
    styleUrls: ['./animation-bar.component.scss'],

})
export class AnimationBarComponent {

    private isAnimating: boolean = false;
    private isPausedAnimating: boolean = false;
    constructor(private stateService: StateService, private animationService: AnimationService) {


    }

    invalidMechanism() {
        this.animationService.isInvalid();
    }
    controlAnimation(state: string) {
        switch (state) {
            case 'pause':
                this.animationService.animateMechanisms(false);
                this.isAnimating = true;
                this.isPausedAnimating = true;
                break;
            case 'play':
                this.animationService.animateMechanisms(true);
                this.isAnimating = true;
                this.isPausedAnimating = false;
                break;
            case 'stop':
                this.animationService.reset();
                this.isAnimating = false;
                this.isPausedAnimating = false;
                break;
        }
    }

    getIsAnimating():boolean{
        return this.isAnimating;
    }
    getIsPausedAnimating():boolean{
        return this.isPausedAnimating;
    }

}