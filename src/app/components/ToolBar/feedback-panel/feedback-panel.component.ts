import { Component } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction.service'
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import axios from 'axios';

@Component({
  selector: 'app-feedback-panel',
  templateUrl: './feedback-panel.component.html',
  styleUrls: ['./feedback-panel.component.scss'],
})
export class FeedbackPanelComponent {
  message: string = '';
  sectionExpanded: { [key: string]: boolean } = {
    LBasic: true,
    LVisual: true,
  };



  gridEnabled: boolean= true;
  minorGridEnabled: boolean = true;

  constructor(private interactionService: InteractionService, private fb: FormBuilder){
  }

  commentForm = this.fb.group({
    comment: ['', Validators.required],
    email: ['', Validators.email],
    response: [false],
    diagnostics: [true],
    project: [true],
  });

  matcher = new MyErrorStateMatcher();

  gotoGithub() {
    //Open a new tab to this site: https://pmks.mech.website/pmks-web-how-to-videos/
    window.open('https://github.com/PMKS-Web/PMKS-Refactor', '_blank');
  }

  btncheck(){
    console.log("btn clicked")
  }

  public sendEmail(e: Event) {
    console.log("email function called");
    e.preventDefault();


    emailjs
      .sendForm('service_pg2k647', 'template_kfwdx5c', e.target as HTMLFormElement)
      .then(
        () => {
          console.log('EMAIL SENT SUCCESSFULLY!');
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
  }

  async onSubmit(e: Event) {
    console.log('slack message');
    e.preventDefault();
    if (!this.message) {
      return;
    }

    const webhookUrl = 'https://hooks.slack.com/services/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';

    try {
      const response = await axios.post(webhookUrl, {
        text: this.message
      });
      console.log('Message sent to Slack:', response.data);
    } catch (error) {
      console.error('Error sending message to Slack:', error);
    }
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
