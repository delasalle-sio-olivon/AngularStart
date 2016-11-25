import{Categorie} from './Categorie';
import{Composite} from './Composite';


/**
 * Information
 */
export class Information extends Composite{
    id : number;
    unix : string;
    titre : string;
    resume : string;
    detail : string;
    parent : Categorie;
    
    constructor(unix : string, titreP : string, resumeP : string, detailP : string, categorie : Categorie = null, idP : number = -1) {
        super();
        this.unix = unix;
        this.titre = titreP;
        this.resume = resumeP;
        this.detail = detailP;
        this.id = idP;
        this.parent = categorie;
    }
    //permet de chercher une info dans un tableau d'Information[]
    static getInArrayByUnix(tab : Array<Information>, unix : string) : Information{
        let infoCherche : Information = null;
        for(let i = 0; i < tab.length; i++){
            if(tab[i].unix == unix){
                return tab[i];
            }
        }
        return infoCherche;
    }

    static getInArrayById(tab : Array<Information>, id : number) : Information{
        let infoCherche : Information = null;
        for(let i = 0; i < tab.length; i++){
            if(tab[i].id === id){
                return tab[i];
            }
        }
        return infoCherche;
    }

    static filterById(element : Information[], id : number) {
        return element.filter(el=>{
            if(el.id === id){
                return true;
            }
            return false;
        });
    }

    static filterLessThanId(element : Information[], id : number) {
        return element.filter(el=>{
            if(el.id < id){
                return true;
            }
            return false;
        });
    }

    static filterMoreThanId(element : Information[], id : number) {
        return element.filter(el=>{
            if(el.id > id){
                return true;
            }
            return false;
        });
    }
}