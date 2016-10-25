import{Composite} from './Composite';
import{Information} from './Information';


/**
 * Categorie
 */
export class Categorie implements Composite{
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
    //permet de chercher une Categorie dans un tableau de Categorie[] (et dans les catégorie enfant aussi )
    static getInArrayByUnix(tab : Array<Categorie>, unix : string) : Categorie{
        let catCherche : Categorie = null;

        for(let i = 0; i < tab.length; i++){
            if(tab[i].unix == unix){
                return tab[i];
            }else{
                catCherche = Categorie.getInArrayByUnix(tab[i].categories, unix);
                if(catCherche !== null){
                    return catCherche;
                }
            }
        }
        return catCherche;
    }
}