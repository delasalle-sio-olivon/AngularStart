import{Categorie} from './Categorie';

/**
 * Information
 */
export class Information{
    id : number;
    titre : string;
    resume : string;
    detail : string;
    parent : Categorie;
    
    constructor(titreP : string, resumeP : string, detailP : string, categorie : Categorie, idP : number = -1) {
        this.titre = titreP;
        this.resume = resumeP;
        this.detail = detailP;
        this.id = idP;
        this.parent = categorie;
    }
}