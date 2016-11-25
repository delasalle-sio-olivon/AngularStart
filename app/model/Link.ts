/**
 * Link
 */
export class Link {

    idParent : number;
    idEnfant : number;

    constructor(idParent : number, idEnfant : number) {
        this.idParent = idParent;
        this.idEnfant = idEnfant;
    }

    /**
     * Filtre un tableau de Link en ne retournant que les Links ayant pour idEnfant l'id demandé
     */
    static filterByIdEnfant(links : Link[], id : number){
        return links.filter(link => {
            if(link.idEnfant === id){
                return true;
            }
            return false;
        });
    }

    /**
     * Filtre un tableau de Link en ne retournant que les Links ayant pour idParent l'id demandé
     */
    static filterByIdParent(links : Link[], id : number){
        return links.filter(link => {
            if(link.idParent === id){
                return true;
            }
            return false;
        });
    }

    /**
     * Filtre un tableau de Link en ne retournant que les Links n'ayant pas pour idParent l'id demandé
     */
    static filterByNotIdParent(links : Link[], id : number){
        return links.filter(link => {
            if(link.idParent !== id){
                return true;
            }
            return false;
        });
    }

    /**
     * Filtre un tableau de Link en ne retournant que les Links n'ayant pas pour idEnfant l'id demandé
     */
    static filterByNotIdEnfant(links : Link[], id : number){
        return links.filter(link => {
            if(link.idEnfant !== id){
                return true;
            }
            return false;
        });
    }

    /**
     * Filtre un tableau de Link en ne retournant que les Links ayant une idParent/Enfant égale a celle demandé
     */
    static filterByNotId(links : Link[], id : number){
        return links.filter(link => {
            if(link.idParent !== id && link.idEnfant !== id){
                return true;
            }
            return false;
        });
    }

    /**
     * Filtre un tableau de Link en ne retournant que les Links ayant une idParent/Enfant égale a celle demandé
     */
    static filterById(links : Link[], id : number){
        return links.filter(link => {
            if(link.idParent === id || link.idEnfant === id){
                return true;
            }
            return false;
        });
    }

    /**
     * Filtre un tableau de Link en ne retournant que les Links ayant une idParent/Enfant inférieur a celle demandé
     */
    static filterByLessThanId(links : Link[], id : number){
        return links.filter(link => {
            if(link.idParent < id || link.idEnfant < id){
                return true;
            }
            return false;
        });
    }

    /**
     * Filtre un tableau de Link en ne retournant que les Links ayant une idParent/Enfant supérieur a celle demandé
     */
    static filterByMoreThanId(links : Link[], id : number){
        return links.filter(link => {
            if(link.idParent > id || link.idEnfant > id){
                return true;
            }
            return false;
        });
    }

    /**
     * Retourne le premier Link d'un tableau de Link ayant pour idParent l'id demandé
     * return Link || undefined si il n'y en a pas
     */
    static findByIdParent(links : Link[], id : number){
        return links.find(link => {
            if(link.idParent === id){
                return true;
            }
            return false;
        });
    }

    /**
     * Retourne le premier Link d'un tableau de Link ayant pour idParent l'id demandé
     * return Link || undefined si il n'y en a pas
     */
    static findByIdEnfant(links : Link[], id : number){
        return links.find(link => {
            if(link.idEnfant === id){
                return true;
            }
            return false;
        });
    }

    /**
     * Retourne l'index premier Link d'un tableau de Link du Link demandé
     * return Link || undefined si il n'y en a pas -1
     */
    static findIndex(links : Link[], linkP : Link){
        return links.findIndex(link => {
            if(link.idEnfant === linkP.idEnfant && link.idParent === linkP.idParent){
                return true;
            }
            return false;
        });
    }


}