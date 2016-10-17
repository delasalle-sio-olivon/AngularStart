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

    constructor(titreP : string, resumeP : string, detailP : string, idP : number = -1, idGaucheP : number = -1, idDroiteP : number = -1) {
        this.titre = titreP;
        this.resume = resumeP;
        this.detail = detailP;
        this.id = idP;
        this.idGauche = idGaucheP;
        this.idDroite = idDroiteP
    }
}