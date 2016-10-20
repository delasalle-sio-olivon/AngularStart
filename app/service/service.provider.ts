import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/**
 * Model imports
 */
import { Categorie } from '../model/Categorie';

@Injectable()
export class ServiceProvider {
    constructor(private http: Http) {   }
    
    getFirstCategories() : Categorie[]{
        let categories : Categorie[] = new Array();
        categories.push(new Categorie("CatTest1", "Catégorie de test", "Catégorie de test1, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",1));
        categories.push(new Categorie("CatTest2", "Catégorie de test2", "Catégorie de test2, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",2));    
        categories.push(new Categorie("CatTes3", "Catégorie de test3", "Catégorie de test3, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",3));
        categories.push(new Categorie("CatTest4", "Catégorie de test4", "Catégorie de test4, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",4));    
        categories.push(new Categorie("CatTest5", "Catégorie de test5", "Catégorie de test5, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",5));
        categories.push(new Categorie("CatTest6", "Catégorie de test6", "Catégorie de test6, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",6));    
        categories.push(new Categorie("CatTest7", "Catégorie de test7", "Catégorie de test7, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",7));
        categories.push(new Categorie("CatTest8", "Catégorie de test8", "Catégorie de test8, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",8));    
        categories.push(new Categorie("CatTest9", "Catégorie de test9", "Catégorie de test9, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",9));
        
        //categories[0].categories=[new Categorie("Sous Catégorie1", "Simple sous catégorie, il n'y a pas grand chose à dire..","Simple sous catégorie, il n'y a pas grand chose à dire mise à part que c'est cool."),new Categorie("Sous Catégorie1", "Simple sous catégorie, il n'y a pas grand chose à dire..","Simple sous catégorie, il n'y a pas grand chose à dire mise à part que c'est cool.")];

        return categories;
    }

    getCategorieEnfants(id : number) : Categorie[]{
        let categories : Categorie[] = new Array<Categorie>();
        categories.push(new Categorie("Sous CatTest1", "Catégorie de test", "Catégorie de test1, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",1));
        categories.push(new Categorie("Sous CatTest2", "Catégorie de test2", "Catégorie de test2, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",2));    
        categories.push(new Categorie("Sous CatTes3", "Catégorie de test3", "Catégorie de test3, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",3));
        return categories;
    }

}
