import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContextMenuOption } from 'src/app/interactions/interactor';
import { ContextMenuService } from 'src/app/services/context-menu.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent {

  constructor(public contextMenuService: ContextMenuService) { }

  // perform the action specified by the option and then hide the context menu
  public onClick(option: ContextMenuOption) {
    option.action();
    this.contextMenuService.hideContextMenu();
  }

}
