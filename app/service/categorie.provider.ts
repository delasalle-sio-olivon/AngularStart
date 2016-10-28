import { Injectable } from '@angular/core';
import { ServiceProvider } from './service.provider';
import { Observable }     from 'rxjs/Observable';

/**
 * Model imports
 */
import { Categorie } from '../model/Categorie';
//service fournit les Categories
@Injectable()
export class CategorieProvider {

    categories : Categorie[];

    constructor(private service : ServiceProvider) { 
        this.categories = new Array();
    }
    
    getFirstCategories() : Observable<Categorie[]>{ 
        return this.service.getFirstCategories()
    }

    getCategorieEnfants(unix : string) : Observable<Categorie[]> {
        return this.service.getCategorieEnfants(unix);
    }

    getCategorie(unix : string) : Observable<Categorie>{
        return this.service.getCategorie(unix);
    }
}
