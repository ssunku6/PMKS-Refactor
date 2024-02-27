

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

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
import { GridLinesComponent } from './components/gridlines/gridlines.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { EditPanelComponent } from './components/edit-panel/edit-panel.component';
import { AnimationBarComponent } from './components/animationbar/animationbar.component';


@NgModule({
  declarations: [
    InteractionDirective,
    AppComponent,
    ContextMenuComponent,
    SvgComponent,
    GraphComponent,
    GridLinesComponent,
    JointComponent,
    LinkComponent,
    CompoundLinkComponent,
    CreateNewCompLineComponent,
    ToolbarComponent,
    SidenavComponent,
    EditPanelComponent,
    AnimationBarComponent,
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonToggleModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
