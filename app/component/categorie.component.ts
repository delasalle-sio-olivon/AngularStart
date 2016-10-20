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
    
    @Output() categorieSelected = new EventEmitter<Categorie>();
    @Input() categorie: Categorie;

    constructor(private router: Router, private route: ActivatedRoute) {

     }

    ngOnInit() { }

    selectCategorie(){
        this.categorieSelected.emit(this.categorie);
        this.router.navigate([this.categorie.titre], { relativeTo: this.route });
    }

    makeLink(){
        return Utils.replaceSpaceByUnderscore(this.categorie.titre);
    }
}