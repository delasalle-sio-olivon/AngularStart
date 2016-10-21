import{CategorieComposite} from './CategorieComposite';
import{Information} from './Information';


/**
 * Categorie
 */
export class Categorie{
    id : number;
    idGauche : number;
    idDroite : number;
    unix : string;
    titre : string;
    resume : string;
    detail : string;
    categories : Categorie[];
    informations : Information[];

    constructor(unixP : string,titreP : string, resumeP : string, detailP : string, idP : number = -1, idGaucheP : number = -1, idDroiteP : number = -1, categories = new Array(), informations = new Array()) {
        this.unix = unixP;
        this.titre = titreP;
        this.resume = resumeP;
        this.detail = detailP;
        this.id = idP;
        this.idGauche = idGaucheP;
        this.idDroite = idDroiteP

        this.categories = categories;
        this.informations = informations;
    }

    static getInArrayByUnix(tab : Array<Categorie>, unix : string) : Categorie{
        let catCherche : Categorie = null;
        tab.forEach(categorie => {
            if(categorie.unix == unix){  
                catCherche =  categorie;
            }
        });
        return catCherche;
    }
}