import { Injectable } from '@angular/core';
import { ServiceProvider } from './service.provider';

/**
 * Model imports
 */
import { Categorie } from '../model/Categorie';

@Injectable()
export class CategorieProvider {
    constructor(private service : ServiceProvider) { 

    }
    
    getFirstCategories() : Categorie[]{
        return this.service.getFirstCategories();
    }
}
