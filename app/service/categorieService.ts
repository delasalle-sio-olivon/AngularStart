import { Injectable } from '@angular/core';

import { Categorie } from '../model/Categorie';
@Injectable()
export class CategorieService {

    constructor() { }

    getAll(): Categorie[] {
        let categories : Categorie[] = new Array[];

        categories.push(new Categorie("CatTest1", "Catégorie de test", "Catégorie de test1, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
        categories.push(new Categorie("CatTest2", "Catégorie de test2", "Catégorie de test2, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));    
        categories.push(new Categorie("CatTes3", "Catégorie de test3", "Catégorie de test3, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
        categories.push(new Categorie("CatTest4", "Catégorie de test4", "Catégorie de test4, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));    
        categories.push(new Categorie("CatTest5", "Catégorie de test5", "Catégorie de test5, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
        categories.push(new Categorie("CatTest6", "Catégorie de test6", "Catégorie de test6, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));    
        categories.push(new Categorie("CatTest7", "Catégorie de test7", "Catégorie de test7, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
        categories.push(new Categorie("CatTest8", "Catégorie de test8", "Catégorie de test8, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));    
        categories.push(new Categorie("CatTest9", "Catégorie de test9", "Catégorie de test9, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!"));
    
        return categories;
    }
}