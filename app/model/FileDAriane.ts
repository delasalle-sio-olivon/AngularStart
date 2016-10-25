/**
 * Import model
 */
import{Composite} from './Composite';
import{Categorie} from './Categorie';

/**
 * FileDAriane
 */
export class FileDAriane {
    position : Composite[];
    
    constructor() {
        this.position = new Array<Composite>();
    }
    
    clean() : void {
        this.position = new Array();
    }
}