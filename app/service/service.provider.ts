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
        categories.push(new Categorie("cat1","CatTest1", "Catégorie de test", "Catégorie de test1, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",1));
        categories.push(new Categorie("cat2","CatTest2", "Catégorie de test2", "Catégorie de test2, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",2));    
        categories.push(new Categorie("cat3","CatTes3", "Catégorie de test3", "Catégorie de test3, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",3));
        categories.push(new Categorie("cat4","CatTest4", "Catégorie de test4", "Catégorie de test4, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",4));    
        categories.push(new Categorie("cat5","CatTest5", "Catégorie de test5", "Catégorie de test5, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",5));
        categories.push(new Categorie("cat6","CatTest6", "Catégorie de test6", "Catégorie de test6, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",6));    
        categories.push(new Categorie("cat7","CatTest7", "Catégorie de test7", "Catégorie de test7, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",7));
        categories.push(new Categorie("cat8","CatTest8", "Catégorie de test8", "Catégorie de test8, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",8));    
        categories.push(new Categorie("cat9","CatTest9", "Catégorie de test9", "Catégorie de test9, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",9));
        
        //categories[0].categories=[new Categorie("Sous Catégorie1", "Simple sous catégorie, il n'y a pas grand chose à dire..","Simple sous catégorie, il n'y a pas grand chose à dire mise à part que c'est cool."),new Categorie("Sous Catégorie1", "Simple sous catégorie, il n'y a pas grand chose à dire..","Simple sous catégorie, il n'y a pas grand chose à dire mise à part que c'est cool.")];

        return categories;
    }

    getCategorieEnfants(unix : string) : Categorie[]{
        let categories : Categorie[] = new Array<Categorie>();
        categories.push(new Categorie("cat11","Sous CatTest1", "Catégorie de test", "Catégorie de test1, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",1));
        categories.push(new Categorie("cat12","Sous CatTest2", "Catégorie de test2", "Catégorie de test2, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",2));    
        categories.push(new Categorie("cat13","Sous CatTes3", "Catégorie de test3", "Catégorie de test3, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",3));
        return categories;
    }

    getCategorie(unix : string) : Categorie {
        let categories : Categorie[] = new Array();
        categories.push(new Categorie("cat1","CatTest1", "Catégorie de test", "Catégorie de test1, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",1));
        categories.push(new Categorie("cat2","CatTest2", "Catégorie de test2", "Catégorie de test2, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",2));    
        categories.push(new Categorie("cat3","CatTes3", "Catégorie de test3", "Catégorie de test3, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",3));
        categories.push(new Categorie("cat4","CatTest4", "Catégorie de test4", "Catégorie de test4, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",4));    
        categories.push(new Categorie("cat5","CatTest5", "Catégorie de test5", "Catégorie de test5, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",5));
        categories.push(new Categorie("cat6","CatTest6", "Catégorie de test6", "Catégorie de test6, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",6));    
        categories.push(new Categorie("cat7","CatTest7", "Catégorie de test7", "Catégorie de test7, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",7));
        categories.push(new Categorie("cat8","CatTest8", "Catégorie de test8", "Catégorie de test8, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",8));    
        categories.push(new Categorie("cat9","CatTest9", "Catégorie de test9", "Catégorie de test9, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",9));
        categories.push(new Categorie("cat11","Sous CatTest1", "Catégorie de test", "Catégorie de test1, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",1));
        categories.push(new Categorie("cat12","Sous CatTest2", "Catégorie de test2", "Catégorie de test2, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",2));    
        categories.push(new Categorie("cat13","Sous CatTes3", "Catégorie de test3", "Catégorie de test3, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",3));
        
        return Categorie.getInArrayByUnix(categories,unix);
    }
}
