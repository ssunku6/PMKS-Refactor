

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
import { jointEditPanelComponent} from "./components/joint-edit-panel/joint-edit-panel.component";
import { LinkComponent } from './components/link/link.component';
import { CompoundLinkComponent } from './components/compound-link/compound-link.component';
import { GridLinesComponent } from './components/gridlines/gridlines.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { EditPanelComponent } from './components/edit-panel/edit-panel.component';
import { LinkEditPanelComponent } from './components/link-edit-panel/link-edit-panel.component';
import { PanelSectionCollapsibleComponent } from './components/Blocks/panel-section-collapsible/panel-section-collapsible.component';
import { PanelSectionComponent } from './components/Blocks/panel-section/panel-section.component';
import { TitleBlock } from './components/Blocks/title/title.component';
import { CollapsibleSubsectionComponent } from './components/Blocks/collapsible-subsection/collapsible-subsection.component';
import {DualInputComponent} from "./components/Blocks/dual-input/dual-input.component";
import {FormGroup, FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import {ToggleComponent} from "./components/Blocks/toggle/toggle.component";
import {MatInputModule} from "@angular/material/input";
import {TriButtonComponent} from "./components/Blocks/tri-button/tri-button.component";
import { DualButtonComponent } from './components/Blocks/dual-button/dual-button.component';
import {JointAnalysisPanelComponent} from "./components/joint-analysis-panel/joint-analysis-panel.component";
import {AnalysisPanelComponent} from "./components/analysis-panel/analysis-panel.component";
import { SynthesisPanelComponent } from './components/synthesis-panel/synthesis-panel.component';
import { ThreePosSynthesis } from './components/three-pos-synthesis/three-pos-synthesis.component';
import { PathSynthesis } from './components/path-synthesis/path-synthesis.component';
import { RadioComponent } from './components/Blocks/radio/radio.component';
import { SingleInputComponent } from './components/Blocks/single-input/single-input.coponent';

@NgModule({
  declarations: [
    InteractionDirective,
    AppComponent,
    ContextMenuComponent,
    SvgComponent,
    GraphComponent,
    GridLinesComponent,
    JointComponent,
    jointEditPanelComponent,
    LinkComponent,
    CompoundLinkComponent,
    CreateNewCompLineComponent,
    ToolbarComponent,
    SidenavComponent,
    EditPanelComponent,
    LinkEditPanelComponent,
    PanelSectionCollapsibleComponent,
    PanelSectionComponent,
    TitleBlock,
    CollapsibleSubsectionComponent,
    DualInputComponent,
    ToggleComponent,
    TriButtonComponent,
    DualButtonComponent,
    JointAnalysisPanelComponent,
    AnalysisPanelComponent,
    SynthesisPanelComponent,
    ThreePosSynthesis,
    PathSynthesis,
    RadioComponent,
    SingleInputComponent,
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
