import { Categorie } from '../../model/Categorie';

import { TestBed }      from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
 
describe('Model Categorie', () => {
    let categorie : Categorie;
 
    beforeEach(() => {
        categorie = new Categorie("CatTest", "Catégorie de test", "Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!");
    });
 
    it('Constructeur (Obligatoire seulement)', () => {
        expect(categorie.titre).toBe("CatTest");
        expect(categorie.resume).toBe("Catégorie de test");
        expect(categorie.detail).toBe("Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!");
        expect(categorie.id).toBe(-1);
        expect(categorie.idGauche).toBe(-1);
        expect(categorie.idDroite).toBe(-1);
    });

    it('Constructeur (Full)', () => {

        categorie = new Categorie("CatTest", "Catégorie de test", "Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!", 1,2,3);

        expect(categorie.titre).toBe("CatTest");
        expect(categorie.resume).toBe("Catégorie de test");
        expect(categorie.detail).toBe("Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!");
        expect(categorie.id).toBe(1);
        expect(categorie.idGauche).toBe(2);
        expect(categorie.idDroite).toBe(3);
    });
});