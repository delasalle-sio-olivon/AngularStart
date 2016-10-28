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
    templateUrl: 'view/categorie.component.html',
    styleUrls : ['css/categorie.component.css']
})
export class CategorieComponent {
    //attribut entrant de main
    @Input() categorie: Categorie;

    constructor(private router: Router, private route: ActivatedRoute) {

     }
    //redirection vers la page de la catégorie
    selectCategorie(){
        this.router.navigate([Utils.replaceSpaceByUnderscore(this.categorie.unix)], { relativeTo: this.route });
    }
}