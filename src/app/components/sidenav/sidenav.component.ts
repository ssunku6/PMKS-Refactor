import { Component} from '@angular/core'

interface Tab {
    selected: boolean, 
    label: string,
    icon: string
}


@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: [ './sidenav.component.scss'],

})
export class SidenavComponent {

    tabs: Tab[] = [
        {selected: false, label: 'Synthesize',icon: 'assets/sidenav/synthesize.svg'},
        {selected: true, label: 'Edit',icon: 'assets/sidenav/edit.svg'},
        {selected: false, label: 'Analyze', icon:'assets/sidenav/analyze.svg'},
    ];
    constructor(){
    }


setCurrentTab(clickedTab: string){
    this.tabs.forEach((tab)=>{
        if(tab.label == clickedTab){
            tab.selected = true;
        } else{
            tab.selected = false;
        }
    });
}
isSelected(id: string): boolean{
    let isSelected = false;
    this.tabs.forEach((tab)=>{
        if(tab.label == id){
            isSelected = tab.selected;
        }
    });
    return isSelected;
}
getSelected(): string {
    let selectedTab = '';
    this.tabs.forEach((tab)=>{
        if(tab.selected){
            selectedTab = tab.label;
        }
    });
    return selectedTab;
}


}