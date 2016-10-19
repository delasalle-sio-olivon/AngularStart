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

    /**
     * Attribut
     */
    fileDAriane : FileDAriane;
    recherche : Recherche;
    categorieSelected : Categorie | boolean;
    categories : Categorie[];
    informations : Information[];
    nbCol : number;
    col : number[];
    /**
     * Constructeur
     */
    constructor(){
        this.fileDAriane = new FileDAriane();
        this.recherche = new Recherche();
        this.categories = new Array();
        this.informations = new Array();
    }
    /**
     * Appelé après le Constructeur
     */
    ngOnInit() {
        this.categories = this.categorieService.getAll();
        this.nbCol = 3;
        this.col = new Array(this.nbCol);
        this.categorieSelected = false;
    }

    /**
     * Evenements
     */
    changeCategorie(categorie : Categorie){
        this.categorieSelected = categorie;
        this.categories = categorie.categories;
    }

    /**
     * Méthodes
     */

    hasCategorieSelected() : boolean{
        if(this.categorieSelected){
            return false;
        }
        return true;
    }



    hasCategories() : boolean {
        if (this.categories.length>0){
            return true;
        }
        return false;
    }


}