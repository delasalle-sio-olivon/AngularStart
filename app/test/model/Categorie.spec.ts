import { Categorie } from '../../model/Categorie';
import { Information } from '../../model/Information';


import { TestBed }      from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
 
describe('Model Categorie', () => {
    let categorie : Categorie;
 
    beforeEach(() => {
        categorie = new Categorie("cattest","CatTest", "Catégorie de test", "Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!");
    });
 
    it('Constructeur', () => {
        let sousCategorie = new Categorie("Sous cattest", "Sous catTest", "Sous catégorie de test", "Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!", 1,2,3,);
        let information = new Information("Titre info", "Résumé info", "Information de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!", categorie);
        categorie = new Categorie("cattest", "CatTest", "Catégorie de test", "Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!", 1,2,3,[sousCategorie],[information]);

        expect(categorie.titre).toBe("CatTest");
        expect(categorie.resume).toBe("Catégorie de test");
        expect(categorie.detail).toBe("Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!");
        expect(categorie.id).toBe(1);
        expect(categorie.idGauche).toBe(2);
        expect(categorie.idDroite).toBe(3);
        expect(categorie.categories).toEqual([sousCategorie]);
        expect(categorie.informations).toEqual([information]);
    });

    it('Constructeur', () => {
        let tab : Categorie[] = new Array();
        tab.push(categorie);
        categorie = new Categorie("souscattest", "Sous catTest", "Sous catégorie de test", "Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!", 1,2,3,);
        tab.push(categorie);
        categorie = new Categorie("unixatrouver", "CatTest", "Catégorie de test", "Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!", 1,2,3);
        tab.push(categorie);
        expect(Categorie.getInArrayByUnix(tab,"unixatrouver")).toEqual(categorie);
    });
});