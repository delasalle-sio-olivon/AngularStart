import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
/**
 * Model imports
 */
import { Categorie } from '../model/Categorie';

@Component({
    moduleId: module.id,
    selector: 'categorie',
    templateUrl: '/app/view/categorie.component.html'
})
export class CategorieComponent implements OnInit {
    
    @Output() categorieSelected = new EventEmitter<Categorie>();
    @Input() categorie: Categorie;

    constructor() {

     }

    ngOnInit() { }

    selectCategorie(){
        this.categorieSelected.emit(this.categorie);
    }
}