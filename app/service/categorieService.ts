import { Injectable } from '@angular/core';

/**
 * Imports model
 */
import { Categorie } from '../model/Categorie';

/**
 * Imports provider
 */
import { ServiceProvider } from '../service/service.provider';

@Injectable()
export class CategorieService {

    constructor(private service : ServiceProvider) { }

    getFirstCategories(): Categorie[] {
        return this.service.getFirstCategories();
    }
}