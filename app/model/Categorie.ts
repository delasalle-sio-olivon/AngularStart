import{CategorieComposite} from './CategorieComposite';
import{Information} from './Information';


/**
 * Categorie
 */
export class Categorie implements CategorieComposite {
    id : number;
    idGauche : number;
    idDroite : number;
    titre : string;
    resume : string;
    detail : string;
    categories : Categorie[];
    informations : Information[];

    constructor(titreP : string, resumeP : string, detailP : string, idP : number = -1, idGaucheP : number = -1, idDroiteP : number = -1, categories = new Array(), informations = new Array()) {
        this.titre = titreP;
        this.resume = resumeP;
        this.detail = detailP;
        this.id = idP;
        this.idGauche = idGaucheP;
        this.idDroite = idDroiteP

        this.categories = categories;
        this.informations = informations;
    }
}