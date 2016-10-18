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
        this.categories.push(new Categorie("CatTest1", "Catégorie de test", "Catégorie de test1, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
        this.categories.push(new Categorie("CatTest2", "Catégorie de test2", "Catégorie de test2, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));    
        this.categories.push(new Categorie("CatTes3", "Catégorie de test3", "Catégorie de test3, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
        this.categories.push(new Categorie("CatTest4", "Catégorie de test4", "Catégorie de test4, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));    
        this.categories.push(new Categorie("CatTest5", "Catégorie de test5", "Catégorie de test5, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
        this.categories.push(new Categorie("CatTest6", "Catégorie de test6", "Catégorie de test6, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));    
        this.categories.push(new Categorie("CatTest7", "Catégorie de test7", "Catégorie de test7, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
        this.categories.push(new Categorie("CatTest8", "Catégorie de test8", "Catégorie de test8, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));    
        this.categories.push(new Categorie("CatTest9", "Catégorie de test9", "Catégorie de test9, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
    
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