import {Component, inject, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import {UrlGenerationService} from "../../../services/url-generation.service";

@Component({
  selector: 'app-open-panel',
  templateUrl: './open-panel.component.html',
  styleUrls: ['./open-panel.component.css'],
})
export class OpenPanelComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef;

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file);
    }
  }
  // private analytics: Analytics = inject(Analytics);
  //
  // static instance: OpenPanelComponent;
  //
  // constructor(
  //   private urlGenerationService: UrlGenerationService,
  //
  // ) {
  //   OpenPanelComponent.instance = this;
  // }
  //
  ngOnInit(){
    this.openFileExplorer()
  }
  //
  // upload($event: any) {
  //   console.log("upload");
  //   logEvent(this.analytics, 'upload_file');
  //   const input = $event.target;
  //   if (input.files.length !== 1) {
  //     console.log('No file selected', input.files.length);
  //     //NewGridComponent.sendNotification('No file selected');
  //     return;
  //   }
  //   const reader = new FileReader();
  //
  //   reader.onload = () => {
  //     const data = reader.result as string;
  //     console.log("open", data);
  //     //NewGridComponent.sendNotification('Loaded Mechanism from File');
  //
  //     //this.urlProcessorService.updateFromURL(data);
  //
  //     //TODO for Ansel - Clear the history
  //
  //     //Reset the input so that the same file can be uploaded again
  //     input.value = '';
  //   }
  //
  //   // actually read the file to call the onload callback above
  //   reader.readAsText(input.files[0]);
  // }
}
