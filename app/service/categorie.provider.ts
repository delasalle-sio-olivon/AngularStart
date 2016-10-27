import { Injectable } from '@angular/core';
import { ServiceProvider } from './service.provider';

/**
 * Model imports
 */
import { Categorie } from '../model/Categorie';
//service fournit les Categories
@Injectable()
export class CategorieProvider {
    constructor(private service : ServiceProvider) { 

    }
    
    getFirstCategories() : any{
        let a = this.service.getFirstCategories().subscribe(response => {
            console.log(response);
        // logs the array of races
        });
    }

    getCategorieEnfants(unix : string) : Categorie[] {
        return this.service.getCategorieEnfants(unix);
    }

    getCategorie(unix : string) : Categorie{
        return this.service.getCategorie(unix);
    }
}
