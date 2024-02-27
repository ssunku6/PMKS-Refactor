import { Component } from '@angular/core'
import { CompoundLinkInteractor } from 'src/app/interactions/compound-link-interactor';
import { JointInteractor } from 'src/app/interactions/joint-interactor';
import { LinkInteractor } from 'src/app/interactions/link-interactor';
import { Joint } from 'src/app/model/joint';
import { AnimationService } from 'src/app/services/animation.service';
import { InteractionService } from 'src/app/services/interaction.service';



@Component({
    selector: 'app-animation-bar',
    templateUrl: './animationbar.component.html',
    styleUrls: [ './animationbar.component.scss'],
})
export class AnimationBarComponent {

    private isAnimating: boolean = false;
    private isPausedAnimating: boolean = true;
    constructor(private interactionServive: InteractionService, private animationService: AnimationService) {


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
                this.isPausedAnimating = true;
                break;
        }
    }

    getIsAnimating():boolean{
        return this.isAnimating;
    }
    getIsPausedAnimating():boolean{
        return this.isPausedAnimating;
    }
    
    getMechanismIndex():number{
        let obj = this.interactionServive.getSelectedObject();
        let index = -1;
        if(obj == undefined){
            return -1;
        }
        switch (obj.constructor.name){
            case 'JointInteractor':
                let jInteractor = obj as JointInteractor;
                index = this.animationService.getSubMechanismIndex(jInteractor.joint.id);
            break;
            case 'LinkInteractor':
                let lInteractor = obj as LinkInteractor;
                index = this.animationService.getSubMechanismIndex(lInteractor.link.getJoints()[0].id);
            break;
            case 'CompoundLinkInteractor':
                let cInteractor = obj as CompoundLinkInteractor;
                index = this.animationService.getSubMechanismIndex(cInteractor.compoundLink.getJoints()[0].id);
            break;
            case 'ForceInteractor':
                return -1
            break;
        }
        return index;
    }

    


}