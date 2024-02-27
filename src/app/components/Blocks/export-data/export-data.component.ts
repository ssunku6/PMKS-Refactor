import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Link} from "../../../model/link";
import {KinematicSolverService} from "../../../services/kinematic-solver.service";
import {AnalysisSolveService} from "../../../services/analysis-solver.service";
import {Coord} from "../../../model/coord";
import { AnimationPositions } from '../../../services/kinematic-solver.service';
import Papa from 'papaparse';
import {join} from "@angular/compiler-cli";
import {StateService} from "../../../services/state.service";
import {Joint} from "../../../model/joint";




@Component({
  selector: 'export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.scss'],
})
export class ExportDataComponent {
  @Input() dynamicText: string = '';
  @Input() graphText: string = '';
  @Input() btn1Action!: () => void;

  constructor(private kinematicSolverService: KinematicSolverService, private analysisSolverService: AnalysisSolveService,
              private stateService: StateService) {}

  exportData() {
    const animationPositions: AnimationPositions[] = this.kinematicSolverService.getAnimationFrames();
    const mechanism = this.stateService.getMechanism();

    // Prepare an array to store CSV rows
    const csvRows: string[] = [];
    const headerRow = ['Time'];
    let solveOrders = this.kinematicSolverService.getSolveOrders();

    for (let mechanismIndex = 0; mechanismIndex < animationPositions.length; mechanismIndex++) {
      for (let jointIndex = 0; jointIndex < animationPositions[mechanismIndex].correspondingJoints.length; jointIndex++) {
        let mechanismOrder = solveOrders[mechanismIndex].order;
        headerRow.push(`Joint ${mechanismOrder[jointIndex]} X`, `Joint ${mechanismOrder[jointIndex]} Y`);
      }
    }

    for(let joint of mechanism.getJoints()){
      headerRow.push(`Joint ${joint.id} Link`)
    }

    csvRows.push(headerRow.join(',')); // Add more joints as neede

    // Iterate through animation positions
    for (let i = 0; i < animationPositions.length; i++) {
      const time = i; // Use the iteration index as time for simplicity, replace with actual time if available

      // Iterate through joints
      for (let j = 0; j < animationPositions[i].positions.length; j++) {
        const jointData = animationPositions[i].positions[j];

        // Assuming jointData is an array of Coord
        const jointDataRow = jointData.map(coord => `${coord.x},${coord.y}`).join(',');

        // Add a row for each time and joint
        csvRows.push(`${time},${jointDataRow}`);
      }
    }

    for(let joint of mechanism.getJoints()){
      const jointConnectedLinks = mechanism.getConnectedLinksForJoint(joint);
      const jointDataRow = jointConnectedLinks.map(id => id.id);
      csvRows.push(`${jointDataRow.join(',')}`)
    }

    // Join rows into a single CSV string
    const csvData = csvRows.join('\n');

    // Create a Blob from the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Create a link element and trigger a download
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'positions.csv';
    a.click();
  }

}
