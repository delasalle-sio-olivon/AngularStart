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

    constructor(){
        this.fileDAriane = new FileDAriane();
        this.recherche = new Recherche();
        this.categories = new Array();
        this.information = new Array();
    }

    ngOnInit() {
        this.categories.push(new Categorie("CatTest", "Catégorie de test", "Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
    }
}