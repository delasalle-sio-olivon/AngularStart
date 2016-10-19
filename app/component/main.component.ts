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
        this.categories.push(new Categorie("CatTest1", "Catégorie de test", "Catégorie de test1, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
        this.categories.push(new Categorie("CatTest2", "Catégorie de test2", "Catégorie de test2, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));    
        this.categories.push(new Categorie("CatTes3", "Catégorie de test3", "Catégorie de test3, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
        this.categories.push(new Categorie("CatTest4", "Catégorie de test4", "Catégorie de test4, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));    
        this.categories.push(new Categorie("CatTest5", "Catégorie de test5", "Catégorie de test5, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
        this.categories.push(new Categorie("CatTest6", "Catégorie de test6", "Catégorie de test6, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));    
        this.categories.push(new Categorie("CatTest7", "Catégorie de test7", "Catégorie de test7, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
        this.categories.push(new Categorie("CatTest8", "Catégorie de test8", "Catégorie de test8, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));    
        this.categories.push(new Categorie("CatTest9", "Catégorie de test9", "Catégorie de test9, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
        
        this.categories[0].categories=[new Categorie("Sous Catégorie1", "Simple sous catégorie, il n'y a pas grand chose à dire..","Simple sous catégorie, il n'y a pas grand chose à dire mise à part que c'est cool."),new Categorie("Sous Catégorie1", "Simple sous catégorie, il n'y a pas grand chose à dire..","Simple sous catégorie, il n'y a pas grand chose à dire mise à part que c'est cool.")];

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