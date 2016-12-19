import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
/**
 * La barre du menu
 */
@Component({
    moduleId: module.id,  
    selector: 'barre',
    templateUrl: 'view/barre.component.html',
    styleUrls : ['css/barre.component.css']

})
export class BarreComponent implements OnInit{
    public navIsTop: boolean = true;

    constructor(@Inject(DOCUMENT) private document: Document) { }

    ngOnInit() { }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        let number = this.document.body.scrollTop;
        if (number > 20) {
            this.navIsTop = false;
        } else {
            this.navIsTop = true;
        }
  }

}