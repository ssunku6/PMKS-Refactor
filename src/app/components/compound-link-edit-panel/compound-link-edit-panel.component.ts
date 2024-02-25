import {Component} from '@angular/core'
import {Link} from 'src/app/model/link';
import {InteractionService} from 'src/app/services/interaction.service';
import {StateService} from 'src/app/services/state.service';
import {Joint} from 'src/app/model/joint';
import {ColorService} from 'src/app/services/color.service';
import {CompoundLinkInteractor} from "../../interactions/compound-link-interactor";
import {CompoundLink} from "../../model/compound-link";


@Component({
    selector: 'app-compound-link-edit-panel',
    templateUrl: './compound-link-edit-panel.component.html',
    styleUrls: ['./compound-link-edit-panel.component.scss'],

})
export class CompoundLinkEditPanelComponent {

    sectionExpanded: { [key: string]: boolean } = {
        LBasic: true,
        LVisual: false,
        LComponent: false,
        LMass: true,
        LCompound: true,
        FBasic: true,
        FVisual: false,
      };
      isLocked = false;
      isEditingTitle: boolean = false;
      selectedIndex: number = this.getColorIndex();
     referenceJoint: Joint | undefined;

    constructor(private stateService: StateService, private interactionService: InteractionService, private colorService: ColorService){

    }

    getSelectedObject(): CompoundLink {
        let compoundLink = this.interactionService.getSelectedObject() as CompoundLinkInteractor;
        return compoundLink.compoundLink as CompoundLink;
    }

    getAllConnectedLinks(): IterableIterator<Link> {
        let compoundLink = this.getSelectedObject();
        return compoundLink.links.values();
    }

    getLinkLength(currentLink: Link): number{
        // @ts-ignore
        return currentLink.calculateLength()?.toFixed(4) as unknown as number;
    }
    getLinkAngle(currentLink: Link): number{
        return currentLink.calculateAngle()?.toFixed(4) as unknown as number;
    }

    getLinkJoints(currentLink: Link): Map<number, Joint>{
        return currentLink.joints;
    }

    //Returns the joints contained in a link.
    getLinkComponents(currentLink: Link): IterableIterator<Joint>{
        return this.getLinkJoints(currentLink).values();
    }

    getCompoundLinkName(): string{
        return this.getSelectedObject().name;
    }
    getCompoundLinkLockState(): boolean{
      return this.getSelectedObject().lock;
    }

    setCompoundLinkName(newName: string){
        this.getSelectedObject().name = newName;
        console.log("it set the new name " + this.getSelectedObject().name);
        this.isEditingTitle=false;
    }

    updateCompoundLinkLock(): void {
      // reverse the lock state when updating, because it's a binary boolean (either locked or not)
      this.isLocked = !this.isLocked;
      console.log("Updating compound link lock to this value: " + this.isLocked);
      this.getSelectedObject().lock = this.isLocked;
    }

    /*
    addTracer(): void{
        let CoM = this.getSelectedObject().centerOfMass;
        let tracer = Joint.constructor(-1, CoM);
        this.getSelectedObject().addTracer(tracer);
    }
     */

    onReferenceJointSelected(joint: Joint){
      this.referenceJoint = joint;
    }

    getReferenceJointDist(): number {
      let refJointCoord = this.referenceJoint?.coords;
      let xDiff = 0;
      let yDiff = 0;

      if(refJointCoord) {
        xDiff = refJointCoord.x - this.getSelectedObject().centerOfMass.x;
        yDiff = refJointCoord.y - this.getSelectedObject().centerOfMass.y;
      }

      return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
    }

    getReferenceJointAngle(): number {
      let refJointCoord = this.referenceJoint?.coords;
      let vectorX = 0;
      let vectorY = 0;

      if(refJointCoord) {
        // Calculate the differences in x and y coordinates
        vectorX =  this.getSelectedObject().centerOfMass.x - refJointCoord.x;
        vectorY = this.getSelectedObject().centerOfMass.y - refJointCoord.y;
      }

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
    }


  setReferenceJointAngle(newAngle: number){

  }

    deleteCompoundLink(){
        this.stateService.getMechanism().removeCompoundLink(this.getSelectedObject());
    }

    onTitleBlockClick(event: MouseEvent): void {
        console.log('Title clicked!');
        const clickedElement = event.target as HTMLElement;
        // Check if the clicked element has the 'edit-svg' class, so we can enable editing
        if (clickedElement && clickedElement.classList.contains('edit-svg')) {
          console.log('Edit SVG clicked!');
          this.isEditingTitle = true;
        }
      }

    roundToFour(round:number): number{
        return round.toFixed(4) as unknown as number;
    }

    getColors(): string[]{
        return this.colorService.getLinkColorOptions();
    }

    /*
    getColor(): string{
        return this.getSelectedObject().color;
    }
     */

    getColorIndex(): number{
        return this.colorService.getLinkColorIndex(this.getSelectedObject().id);
    }

    /*
    //TODO
    setCompoundLinkColor(newColor: number){
        console.log(newColor);
        this.getSelectedObject().setColor(newColor);
        this.selectedIndex=newColor;
    }
     */


}
