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
 * Import providers
 */
import { CategorieProvider } from '../service/categorie.provider';

/**
 * Main Component traduit le corps de l'application
 */
@Component({
    selector: 'main',
    templateUrl: 'app/view/main.component.html',
    styles : [".container-fluid{ max-width : 1300px;}"],
    providers : [CategorieProvider]
})
export class MainComponent implements OnInit { 

    /**
     * Attribut
     */
    fileDAriane : FileDAriane;
    recherche : Recherche;
    categorieSelected : Categorie;
    categories : Categorie[];
    informations : Information[];
    nbCol : number;
    col : number[];
    /**
     * Constructeur
     */
    constructor(private categorieService : CategorieProvider){
        this.fileDAriane = new FileDAriane();
        this.recherche = new Recherche();
        this.categories = new Array();
        this.informations = new Array();
    }
    /**
     * Appelé après le Constructeur
     */
    ngOnInit() {
        this.categories = this.categorieService.getFirstCategories();
        this.nbCol = 3;
        this.col = new Array(this.nbCol);
        this.categorieSelected = null;
    }

    /**
     * Evenements
     */
    changeCategorie(categorie : Categorie){
        this.categorieSelected = categorie;
        this.categories = this.categorieService.getCategorieEnfants(this.categorieSelected.id);
    }

    /**
     * Evenements
     */
    backToCategorie(categorie : Categorie){
        this.categorieSelected = categorie;
        /**TODO : vue qu'on utilise le file d'ariane on a peut etre déjà l'arborecence donc pas forcement besoin de réupérer via le service */
        this.categories = this.categorieService.getCategorieEnfants(this.categorieSelected.id);
    }

    /**
     * Méthodes
     */

    hasCategorieSelected() : boolean{
        if(this.categorieSelected === null){
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