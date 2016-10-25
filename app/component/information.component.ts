import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Model imports
 */
import { Information } from '../model/Information';

/**
 * Providers import
 */
import { Utils } from '../service/Utils';

@Component({
    selector: 'information',
    templateUrl: 'app/view/information.component.html',
    styleUrls : ['app/css/information.component.css']
})
export class InformationComponent implements OnInit {
    
    @Input() information: Information;

    constructor(private router: Router, private route: ActivatedRoute) {

     }

    ngOnInit() { }

    selectInformation(){
        this.navigateToThis();
    }

    navigateToThis() : void{
        this.router.navigate([this.information.unix], { relativeTo: this.route });
    }

}