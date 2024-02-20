import { Component, Input, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Chart, ChartOptions} from 'chart.js';

@Component({
  selector: 'app-analysis-graph-block',
  templateUrl: './graph-section.component.html',
  styleUrls: ['./graph-section.component.scss']
})
export class GraphSectionComponent implements AfterViewInit, OnInit {
  @Input() inputXData?: any[] = [{ data: [/* x-values */], label: 'X Position' }];
  @Input() inputYData?: any[] = [{ data: [/* y-values */], label: 'Y Position' }];
  @Input() inputLabels?: string[] = [""]
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

  public chart!: Chart;

  public ChartOptions: any = {
    bezierCurve: true,
    tension: 0.3,
    scaleShowVerticalLines: false,
    responsive: true,
    hover: {
      mode: 'nearest',
      intersect: true
    },
    animation: false,
    scales: {
      display: true,
      text: [this.xAxisLabel, this.yAxisLabel]
    },
    legend: this.showLegend,
  };

  ngOnInit() {
    // Ensure the chart is created after the view has been initialized
    if (this.graphCanvas) {
      this.createChart();
    }
  }
  ngAfterViewInit() {
    // Ensure the chart is created after the view has been initialized
    if (this.graphCanvas) {
      this.createChart();
    }
  }

  createChart() {
    const ctx: CanvasRenderingContext2D = this.graphCanvas.nativeElement.getContext('2d');

    if (this.inputXData && this.inputYData) {
      this.chart = new Chart(ctx, {

        type: 'line',
        data: {
          labels: this.inputLabels,
          datasets: [
            ...this.inputXData,
            ...this.inputYData,
          ]
        },
        options: {
          ...(this.ChartOptions as ChartOptions),
          plugins: {
            afterDraw: (chart: Chart) => {
              const lineIndex = 0; // Index of the dataset to draw the line on
              const dataset = chart.data.datasets[lineIndex];
              const meta = chart.getDatasetMeta(lineIndex);
              const xAxis = chart.scales['x-axis-0'];
              const firstDataPoint = dataset.data[0];

              // Check if firstDataPoint is a number (it could be null)
              if (typeof firstDataPoint === 'number') {
                const yPos = xAxis.getPixelForTick(firstDataPoint);

                // Draw the vertical line
                ctx.beginPath();
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.moveTo(meta.data[0].x, yPos);
                ctx.lineTo(meta.data[0].x, meta.data[meta.data.length - 1].y);
                ctx.stroke();
              }
            },
          } as ChartOptions['plugins'], // Explicitly cast to the correct type
        }
      });
    }
  }

}
