import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Model imports
 */
import { Categorie } from '../model/Categorie';

/**
 * Providers import
 */
import { Utils } from '../service/Utils';

@Component({
    moduleId: module.id,
    selector: 'categorie',
    templateUrl: '/app/view/categorie.component.html'
})
export class CategorieComponent implements OnInit {
    
    @Input() categorie: Categorie;

    constructor(private router: Router, private route: ActivatedRoute) {

     }

    ngOnInit() { }

    selectCategorie(){
        this.navigateToThis();
    }

    navigateToThis() : void{
        this.router.navigate([Utils.replaceSpaceByUnderscore(this.categorie.unix)], { relativeTo: this.route });
    }

}