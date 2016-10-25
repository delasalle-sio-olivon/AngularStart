import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/**
 * Model imports
 */
import { Categorie } from '../model/Categorie';
import { Information } from '../model/Information';


@Injectable()
export class ServiceProvider {

    jdd : Categorie[];
    infos : Information[];

    constructor(private http: Http) { 
        this.jdd = new Array();
        let cat1 : Categorie = new Categorie("cat1","CatTest1", "Catégorie de test", "Catégorie de test1, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",1);
        let cat2 : Categorie = new Categorie("cat2","CatTest2", "Catégorie de test2", "Catégorie de test2, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",2);
        let cat3 : Categorie = new Categorie("cat3","CatTes3", "Catégorie de test3", "Catégorie de test3, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",3);

        cat1.categories.push(new Categorie("cat11","Sous CatTest1", "Catégorie de test", "Catégorie de test1, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",1));
        cat1.categories.push(new Categorie("cat12","Sous CatTest2", "Catégorie de test2", "Catégorie de test2, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",2));    
        cat1.categories.push(new Categorie("cat13","Sous CatTes3", "Catégorie de test3", "Catégorie de test3, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",3));
        
        cat2.categories.push(new Categorie("cat11","Sous CatTest1", "Catégorie de test", "Catégorie de test1, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",1));
        cat2.categories.push(new Categorie("cat12","Sous CatTest2", "Catégorie de test2", "Catégorie de test2, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",2));    
        cat2.categories.push(new Categorie("cat13","Sous CatTes3", "Catégorie de test3", "Catégorie de test3, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",3));

        cat3.categories.push(new Categorie("cat11","Sous CatTest1", "Catégorie de test", "Catégorie de test1, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",1));
        cat3.categories.push(new Categorie("cat12","Sous CatTest2", "Catégorie de test2", "Catégorie de test2, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",2));    
        cat3.categories.push(new Categorie("cat13","Sous CatTes3", "Catégorie de test3", "Catégorie de test3, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",3));

        let info : Information[] = new Array();
        info.push(new Information("info1", "Information 1", "Petite info sympa, on apprends pas mal de choses et tout et tout", "Petite info sympa, on apprends pas mal de choses et tout et tout. Enfin au final c'est juste pour écrire des données plutot longue, ducoup c'est un peu vide de sens..."));
        info.push(new Information("info2", "Information 2", "Petite info sympa, on apprends pas mal de choses et tout et tout", "Petite info sympa, on apprends pas mal de choses et tout et tout. Enfin au final c'est juste pour écrire des données plutot longue, ducoup c'est un peu vide de sens..."));
        info.push(new Information("info3", "Information 3", "Petite info sympa, on apprends pas mal de choses et tout et tout", "Petite info sympa, on apprends pas mal de choses et tout et tout. Enfin au final c'est juste pour écrire des données plutot longue, ducoup c'est un peu vide de sens..."));
        info.push(new Information("info4", "Information 4", "Petite info sympa, on apprends pas mal de choses et tout et tout", "Petite info sympa, on apprends pas mal de choses et tout et tout. Enfin au final c'est juste pour écrire des données plutot longue, ducoup c'est un peu vide de sens..."));
        info.push(new Information("info5", "Information 5", "Petite info sympa, on apprends pas mal de choses et tout et tout", "Petite info sympa, on apprends pas mal de choses et tout et tout. Enfin au final c'est juste pour écrire des données plutot longue, ducoup c'est un peu vide de sens..."));
        info.push(new Information("info6", "Information 6", "Petite info sympa, on apprends pas mal de choses et tout et tout", "Petite info sympa, on apprends pas mal de choses et tout et tout. Enfin au final c'est juste pour écrire des données plutot longue, ducoup c'est un peu vide de sens..."));
        info.push(new Information("info7", "Information 7", "Petite info sympa, on apprends pas mal de choses et tout et tout", "Petite info sympa, on apprends pas mal de choses et tout et tout. Enfin au final c'est juste pour écrire des données plutot longue, ducoup c'est un peu vide de sens..."));
        info.push(new Information("info8", "Information 8", "Petite info sympa, on apprends pas mal de choses et tout et tout", "Petite info sympa, on apprends pas mal de choses et tout et tout. Enfin au final c'est juste pour écrire des données plutot longue, ducoup c'est un peu vide de sens..."));
        info.push(new Information("info9", "Information 9", "Petite info sympa, on apprends pas mal de choses et tout et tout", "Petite info sympa, on apprends pas mal de choses et tout et tout. Enfin au final c'est juste pour écrire des données plutot longue, ducoup c'est un peu vide de sens..."));
        info.push(new Information("info10", "Information 10", "Petite info sympa, on apprends pas mal de choses et tout et tout", "Petite info sympa, on apprends pas mal de choses et tout et tout. Enfin au final c'est juste pour écrire des données plutot longue, ducoup c'est un peu vide de sens..."));
        info.push(new Information("info11", "Information 11", "Petite info sympa, on apprends pas mal de choses et tout et tout", "Petite info sympa, on apprends pas mal de choses et tout et tout. Enfin au final c'est juste pour écrire des données plutot longue, ducoup c'est un peu vide de sens..."));
        info.push(new Information("info12", "Information 12", "Petite info sympa, on apprends pas mal de choses et tout et tout", "Petite info sympa, on apprends pas mal de choses et tout et tout. Enfin au final c'est juste pour écrire des données plutot longue, ducoup c'est un peu vide de sens..."));

        this.infos = info;

        cat1.categories[0].informations = info;
        cat1.categories[1].informations = info;
        cat1.categories[2].informations = info;

        cat2.categories[0].informations = info;
        cat2.categories[1].informations = info;
        cat2.categories[2].informations = info;

        cat3.categories[0].informations = info;
        cat3.categories[1].informations = info;
        cat3.categories[2].informations = info;

        this.jdd.push(cat1);
        this.jdd.push(cat2);    
        this.jdd.push(cat3);
        this.jdd.push(new Categorie("cat4","CatTest4", "Catégorie de test4", "Catégorie de test4, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",4));    
        this.jdd.push(new Categorie("cat5","CatTest5", "Catégorie de test5", "Catégorie de test5, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",5));
        this.jdd.push(new Categorie("cat6","CatTest6", "Catégorie de test6", "Catégorie de test6, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",6));    
        this.jdd.push(new Categorie("cat7","CatTest7", "Catégorie de test7", "Catégorie de test7, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",7));
        this.jdd.push(new Categorie("cat8","CatTest8", "Catégorie de test8", "Catégorie de test8, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",8));    
        this.jdd.push(new Categorie("cat9","CatTest9", "Catégorie de test9", "Catégorie de test9, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!",9));

    }
    
    getFirstCategories() : Categorie[]{
        
        return this.jdd;

    }

    getCategorieEnfants(unix : string) : Categorie[]{
        let cat : Categorie = Categorie.getInArrayByUnix(this.jdd,unix);
        return cat.categories;
    }

    getCategorie(unix : string) : Categorie {
        return Categorie.getInArrayByUnix(this.jdd, unix);
    }

    getInformation(unix : string) : Information{
        return Information.getInArrayByUnix(this.infos, unix);
    }

    getInformationsOfCategorie(unix : string) : Information[]{
        let cat : Categorie = Categorie.getInArrayByUnix(this.jdd,unix);
        return cat.informations;
    }
}
