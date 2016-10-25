import { Injectable } from '@angular/core';
import { ServiceProvider } from './service.provider';

/**
 * Model imports
 */
import { Information } from '../model/Information';
//fourni les Information
@Injectable()
export class InformationProvider {
    constructor(private service : ServiceProvider) { 

    }

    getInformation(unix : string) : Information {
        return this.service.getInformation(unix);
    }

    getInformationsOfCategorie(unix : string) : Information[]{
        return this.service.getInformationsOfCategorie(unix);
    }
    
}
