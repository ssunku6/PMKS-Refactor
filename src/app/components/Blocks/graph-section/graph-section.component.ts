import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph-section.component.html',
  styleUrls: ['./graph-section.component.scss']
})
export class GraphSectionComponent {
  @Input() data: number[] = [];
  @ViewChild('graphCanvas') graphCanvas!: ElementRef;
  // Example properties, you can customize as needed
  @Input() view: [number, number] = [700, 400];
  @Input() colorScheme = {domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']};
  @Input() gradient = false;
  @Input() showLegend = true;
  @Input() showXAxis = true;
  @Input() showYAxis = true;
  @Input() xAxisLabel = 'X Axis Label';
  @Input() yAxisLabel = 'Y Axis Label';

  public ChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public ChartLabels: string[] = ['Time', 'Time', 'Time', 'Time', 'Time'];
  public ChartLegend = true;

  public ChartData: any[] = [
    { data: [1, 2, 3, 4 ,5], label: 'Position of Joint 1' },
  ];
}
