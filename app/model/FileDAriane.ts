/**
 * Import model
 */
import{Categorie} from './Categorie';

/**
 * FileDAriane
 */
export class FileDAriane {
    position : Categorie[];
    
    constructor() {
        this.position = new Array<Categorie>();
    }
    
    clean() : void {
        this.position = new Array();
    }
}