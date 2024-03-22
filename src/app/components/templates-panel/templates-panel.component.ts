import { Component} from '@angular/core'
import { InteractionService } from 'src/app/services/interaction.service'
import { JointInteractor } from 'src/app/interactions/joint-interactor';
import { Mechanism } from 'src/app/model/mechanism';
import { Coord } from 'src/app/model/coord';
import { Joint } from 'src/app/model/joint';
import { Link } from 'src/app/model/link';
import { StateService } from 'src/app/services/state.service';
import { state } from '@angular/animations';
import { ToolbarComponent } from '../toolbar/toolbar.component';


@Component({
    selector: 'app-templates-panel',
    templateUrl: './templates-panel.component.html',
    styleUrls: ['./templates-panel.component.scss'],

})
export class TemplatesPanelComponent {

    private mechanism: Mechanism;
    public open = true;

    constructor(private interactionService: InteractionService, private stateService: StateService){
        //creates a new mechanism in the state
        this.mechanism = this.stateService.getMechanism();
    }

    openTemplate(linkage: string){
        this.open=false; //closes panel sort of, will need a better fix to actually close the panel in the toolbar
        if(linkage==='fourbar'){
            this.makeFourBar();
        }
        else if(linkage==='watt'){
            this.makeWatt();
        }
        else if(linkage==='watt2'){
            this.makeWatt2();
        }
        else if(linkage==='steph3'){
            this.makeSteph3();
        }
        else if(linkage==='slider'){
            this.makeSlider();
        }
    }

    makeFourBar(){
        //these are all of the joints used in the four bar, referenced later 
        let joint1 = new Coord(-2,-2);
        let joint2 = new Coord(-1,1);
        let joint3 = new Coord(3,1);
        let joint4 = new Coord(4,-2);

        this.mechanism.addLink(joint1, joint2);
        let joints = this.mechanism.getJoints();
        let lastJoint= this.getLastJoint(joints);
        if (lastJoint !== undefined) {
            this.mechanism.addLinkToJoint(lastJoint.id, joint3);
        }
        joints=this.mechanism.getJoints();
        lastJoint= this.getLastJoint(joints);
        if (lastJoint !== undefined) {
            this.mechanism.addLinkToJoint(lastJoint.id, joint4);
        }

        //adds the grounded joints and input
        joints=this.mechanism.getJoints();
        for (const joint of joints) {
            if(joint.id===0){
                joint.addGround();
                joint.addInput();
            }
            if(joint.id===5){
                joint.addGround();
            }
        }

        console.log(this.mechanism);
    }

    

    makeWatt(){
        //these are all of the joints used in the watt1linkage, referenced later 
        let joint1 = new Coord(-1.7, -1.3);
        let joint2 = new Coord(-2.5, .6);
        let joint3 = new Coord(-1,4);
        let tracer1 = new Coord(2.4,1.4);
        let joint4 = new Coord(2,8.1);
        let joint5 = new Coord(7.2,5.2);
        let tracer2 = new Coord(8, -2.6);

        this.mechanism.addLink(joint1, joint2);

        let joints = this.mechanism.getJoints(); //makes a list of all the joints in the mechanism
        let lastJoint= this.getLastJoint(joints);
        if (lastJoint !== undefined) {
            this.mechanism.addLinkToJoint(lastJoint.id, joint3);
        }

        joints = this.mechanism.getJoints(); //updates list of all joints
        lastJoint= this.getLastJoint(joints);

        let links = this.mechanism.getIndependentLinks();
        let lastLink  = this.getLastLink(links);
        if (lastLink !== undefined) {
            this.mechanism.addJointToLink(lastLink.id, tracer1);
        }

        //doesn't update last joint so it doesn't add a link to the tracer point
        if (lastJoint !== undefined) {
            this.mechanism.addLinkToJoint(lastJoint.id, joint4);
        }

        joints = this.mechanism.getJoints(); //updates list of all joints
        lastJoint= this.getLastJoint(joints);
        if (lastJoint !== undefined) {
            this.mechanism.addLinkToJoint(lastJoint.id, joint5);
        }

        links = this.mechanism.getIndependentLinks(); //updates list of all links
        lastLink  = this.getLastLink(links);
        if (lastLink !== undefined) {
            this.mechanism.addLinkToLink(lastLink.id, joint5, tracer1);
        }

        links = this.mechanism.getIndependentLinks(); //updates list of all links
        lastLink  = this.getLastLink(links);
        if (lastLink !== undefined) {
            this.mechanism.addJointToLink(lastLink.id, tracer2);
        }


        //adds the grounded joints and input
        joints=this.mechanism.getJoints();
        for (const joint of joints) {
            if(joint.id===0){
                joint.addGround();
                joint.addInput();
            }
            if(joint.id===13){
                joint.addGround();
            }
        }

        console.log(this.mechanism);
    }

    makeWatt2(){
        //these are all of the joints used in the watt2linkage, referenced later 
        let joint1 = new Coord(-3,-2);
        let joint2 = new Coord(-3,-.5);
        let joint3 = new Coord(-.5,1.5);
        let joint4 = new Coord(5.5, 1.2);
        let tracer1 = new Coord(3.5,-2);
        let joint5 = new Coord(11, 1.2);
        let joint6 = new Coord(11.25, -2.3);

        this.mechanism.addLink(joint1, joint2);

        let joints = this.mechanism.getJoints();
        let lastJoint= this.getLastJoint(joints);
        if (lastJoint !== undefined) {
            this.mechanism.addLinkToJoint(lastJoint.id, joint3);
        }

        joints = this.mechanism.getJoints();
        lastJoint= this.getLastJoint(joints);
        if (lastJoint !== undefined) {
            this.mechanism.addLinkToJoint(lastJoint.id, joint4);
        }

        joints = this.mechanism.getJoints();
        lastJoint= this.getLastJoint(joints);

        let links = this.mechanism.getIndependentLinks();
        let lastLink  = this.getLastLink(links);
        if (lastLink !== undefined) {
            this.mechanism.addJointToLink(lastLink.id, tracer1);
        }

        if (lastJoint !== undefined) {
            this.mechanism.addLinkToJoint(lastJoint.id, joint5);
        }

        joints = this.mechanism.getJoints();
        lastJoint= this.getLastJoint(joints);
        if (lastJoint !== undefined) {
            this.mechanism.addLinkToJoint(lastJoint.id, joint6);
        }

        //adds the grounded joints and input
        joints=this.mechanism.getJoints();
        for (const joint of joints) {
            if(joint.id===0){
                joint.addGround();
                joint.addInput();
            }
            if(joint.id===7 || joint.id===10){
                joint.addGround();
            }
        }

        console.log(this.mechanism);
    }

    makeSteph3(){
        //these are all of the joints used in the steph3linkage, referenced later 
        let joint1 = new Coord(-2.2,-2.5);
        let joint2 = new Coord(-2,-1);
        let joint3 = new Coord(2,-1);
        let tracer1 = new Coord(-.2, .9);
        let joint4 = new Coord(1,-3);
        let joint5 = new Coord(4,2);
        let joint6 = new Coord(4,1);

        this.mechanism.addLink(joint1, joint2);

        let joints = this.mechanism.getJoints();
        let lastJoint= this.getLastJoint(joints);
        if (lastJoint !== undefined) {
            this.mechanism.addLinkToJoint(lastJoint.id, joint3);
        }
        let links = this.mechanism.getIndependentLinks();
        joints = this.mechanism.getJoints();
        lastJoint= this.getLastJoint(joints);
        let lastLink  = this.getLastLink(links);
        if (lastJoint !== undefined) {
            this.mechanism.addLinkToJoint(lastJoint.id, joint4);
        }

        //let lastLink  = this.getLastLink(links);
        if (lastLink !== undefined) {
            this.mechanism.addJointToLink(lastLink.id, tracer1);
        }

        joints = this.mechanism.getJoints();
        lastJoint= this.getLastJoint(joints);
        if (lastJoint !== undefined) {
            this.mechanism.addLinkToJoint(lastJoint.id, joint5);
        }

        joints = this.mechanism.getJoints();
        lastJoint= this.getLastJoint(joints);
        if (lastJoint !== undefined) {
            this.mechanism.addLinkToJoint(lastJoint.id, joint6);
        }

        //adds the grounded joints and input
        joints=this.mechanism.getJoints();
        for (const joint of joints) {
            if(joint.id===0){
                joint.addGround();
                joint.addInput();
            }
            if(joint.id===5 || joint.id===10){
                joint.addGround();
            }
        }

        console.log(this.mechanism);
    }

    makeSlider(){
        //these are all of the joints used in the sliderlinkage, referenced later 
        let joint1 = new Coord(-3,0);
        let joint2 = new Coord(-2.5,2.5);
        let joint3 = new Coord(3,1);

        this.mechanism.addLink(joint1, joint2);
        let joints = this.mechanism.getJoints();
        let lastJoint= this.getLastJoint(joints);
        if (lastJoint !== undefined) {
            this.mechanism.addLinkToJoint(lastJoint.id, joint3);
        }

        //adds the grounded joints and input and slider
        joints=this.mechanism.getJoints();
        for (const joint of joints) {
            if(joint.id===0){
                joint.addGround();
                joint.addInput();
            }
            if(joint.id===3){
                joint.addSlider();
            }
        }
        console.log(this.mechanism);
    }

    //this is used to access the last joint added to the mechanism so it can be referenced to create new links/joints
    getLastJoint(joints: IterableIterator<Joint>): Joint | undefined{
        let lastJoint: Joint | undefined;
        for (const joint of joints) {
            lastJoint = joint;
        }
        if (lastJoint !== undefined) {
            return lastJoint;
        }
        else 
            return undefined;
    }

    //this is used to access the last link added to the mechanism so it can be referenced to create new links/joints
    getLastLink(links: IterableIterator<Link>): Link | undefined {
        let lastLink: Link | undefined;
        for (const link of links) {
            lastLink = link;
        }
        if (lastLink !== undefined) {
            return lastLink;
        }
        else 
            return undefined;
    }

}
