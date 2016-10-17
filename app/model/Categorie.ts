/**
 * Categorie
 */
export class Categorie {
    id : number;
    idGauche : number;
    idDroite : number;

    titre : string;
    resume : string;
    detail : string;

    constructor(titreP : string, resumeP : string, detailP : string) {
        this.titre = titreP;
        this.resume = resumeP;
        this.detail = detailP;
    }
}