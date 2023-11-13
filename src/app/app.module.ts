

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';


/* Component Imports */
import { InteractionDirective } from './directives/interaction-directive';
import { AppComponent } from './app.component';
import { AbstractInteractiveComponent } from './components/abstract-interactive/abstract-interactive.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { SvgComponent } from './components/svg/svg.component';
import { CreateNewCompLineComponent } from './components/create-new-comp-line/create-new-comp-line.component';
import { GraphComponent } from './components/graph/graph.component';
import { JointComponent } from './components/joint/joint.component';
import { LinkComponent } from './components/link/link.component';
import { CompoundLinkComponent } from './components/compound-link/compound-link.component';


@NgModule({
  declarations: [
    InteractionDirective,
    AppComponent,
    ContextMenuComponent,
    SvgComponent,
    GraphComponent,
    JointComponent,
    LinkComponent,
    CompoundLinkComponent,
    CreateNewCompLineComponent,
    
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
