import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AbstractInteractiveComponent } from './components/abstract-interactive/abstract-interactive.component';

@NgModule({
  declarations: [
    AppComponent,
    AbstractInteractiveComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
