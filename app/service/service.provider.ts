import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/**
 * Model imports
 */
import { Categorie } from '../model/Categorie';

@Injectable()
export class ServiceProvider {
    constructor(private http: Http) {   }
    
    getFirstCategories() : Categorie[]{
        return categories;
    }

}
