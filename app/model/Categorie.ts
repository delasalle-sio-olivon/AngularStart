import{Composite} from './Composite';
import{Information} from './Information';


/**
 * Categorie
 */
export class Categorie extends Composite{
    id : number;
    unix : string;
    titre : string;
    resume : string;
    detail : string;
    categories : Categorie[];
    informations : Information[];

    constructor(unixP : string,titreP : string, resumeP : string, detailP : string, idP : number = -1, categories = new Array(), informations = new Array()) {
        super();
        this.unix = unixP;
        this.titre = titreP;
        this.resume = resumeP;
        this.detail = detailP;
        this.id = idP;

        this.categories = categories;
        this.informations = informations;
    }

    hasInformations(){
        if(this.informations.length>0){
            return true;
        }
        return false;
    }

    //permet de chercher une Categorie dans un tableau de Categorie[] (et dans les catégorie enfant aussi )
    static getInArrayByUnix(tab : Array<Categorie>, unix : string) : Categorie{
        let catCherche : Categorie = null;
        if(tab === undefined || tab.length<1){
            return catCherche;
        }
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

    static getInArrayById(tab : Array<Categorie>, id : number) : Categorie{
        let catCherche : Categorie = null;
        for(let i = 0; i < tab.length; i++){
            if(tab[i].id == id){
                return tab[i];
            }else{
                if(tab[i].categories !== undefined){
                    catCherche = Categorie.getInArrayById(tab[i].categories, id);
                    if(catCherche !== null){
                        return catCherche;
                    }
                }
            }
        }
        return catCherche;
    }

    static createCategoriesFromRows(rows : any[]){
        if (rows instanceof Array) {
            let categories : Array<Categorie> = new Array<Categorie>();
            rows.forEach(row => {
                categories.push(new Categorie(row.unix, row.titre, row.resume, row.detail,row.id));
            });
            return categories;
        }
        return null;
    }

    static filterById(element : Categorie[], id : number) {
        return element.filter(el=>{
            if(el.id === id){
                return true;
            }
            return false;
        });
    }

    static filterLessThanId(element : Categorie[], id : number) {
        return element.filter(el=>{
            if(el.id < id){
                return true;
            }
            return false;
        });
    }

    static filterMoreThanId(element : Categorie[], id : number) {
        return element.filter(el=>{
            if(el.id > id){
                return true;
            }
            return false;
        });
    }
}