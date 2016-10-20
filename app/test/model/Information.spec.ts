import { Categorie } from '../../model/Categorie';
import { Information } from '../../model/Information';

import { TestBed }      from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
 
describe('Model Information', () => {
    let categorie : Categorie;
    let information : Information;
    beforeEach(() => {
        
    });
 
    it('Constructeur', () => {
        categorie = new Categorie("CatTest", "Catégorie de test", "Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!");

        information = new Information("Titre info", "Résumé info", "Information de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!", categorie);
        expect(information.titre).toBe("Titre info");
        expect(information.resume).toBe("Résumé info");
        expect(information.detail).toBe("Information de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!");
        expect(information.id).toBe(-1);
        expect(information.parent).toEqual(categorie);

    });
});