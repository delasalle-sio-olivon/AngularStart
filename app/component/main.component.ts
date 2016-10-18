/**
 * Import angular
 */
import { Component, OnInit} from '@angular/core';

/**
 * Import model
 */
import { FileDAriane } from '../model/FileDAriane';
import { Recherche } from '../model/Recherche';
import { Categorie } from '../model/Categorie';
import { Information } from '../model/Information';

/**
 * Main Component traduit le corps de l'application
 */
@Component({
    selector: 'main',
    templateUrl: 'app/view/main.component.html'
})
export class MainComponent implements OnInit { 

    fileDAriane : FileDAriane;
    recherche : Recherche;
    categories : Categorie[];
    information : Information[];

    categorieService : CategorieService;

    constructor(categorieService : CategorieService){
        this.categorieService = categorieService;

        this.fileDAriane = new FileDAriane();
        this.recherche = new Recherche();
    }

    ngOnInit() {
        this.categories = this.categorieService.getAll();
}

    getCategoriesCol1(){
        let categoriesCol1 : Categorie[] = new Array();
        for (let i : number = 0; i < this.categories.length; i++) {
            categoriesCol1.push(this.categories[i]);
            i = i+2
        }
        return categoriesCol1;
    }

    getCategoriesCol2(){
        let categoriesCol2 : Categorie[] = new Array();
        for (let i : number = 1; i < this.categories.length; i++) {
            categoriesCol2.push(this.categories[i]);
            i = i+2
        }
        return categoriesCol2;
    }

    getCategoriesCol3(){
        let categoriesCol3 : Categorie[] = new Array();
        for (let i : number = 2; i < this.categories.length; i++) {
            categoriesCol3.push(this.categories[i]);
            i = i+2
        }
        return categoriesCol3;
    }
}