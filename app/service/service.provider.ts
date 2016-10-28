import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
/**
 * Model imports
 */
import { Categorie } from '../model/Categorie';
import { Information } from '../model/Information';

//fourni les données peux les garder en cache
@Injectable()
export class ServiceProvider {

    baseUrl : string = "http://localhost/lumen/public/api/";

    constructor(private http : Http, private jsonp : Jsonp) { 
       
    }
    
    getFirstCategories() : Observable<Categorie[]>{
        return this.http.get(this.baseUrl+"categories/firstoffirst/enfants/categories").map(res => res.json());
    }

    getCategorieEnfants(unix : string) : Observable<Categorie[]>{
        return this.http.get(this.baseUrl+"categories/" + unix + "/enfants/categories").map(res => res.json());
    }

    getCategorie(unix : string) : Observable<Categorie> {
        return this.http.get(this.baseUrl+"categories/" + unix).map(res => res.json());
    }

    getInformation(unix : string) : Observable<Information>{
        return this.http.get(this.baseUrl+"informations/" + unix).map(res => res.json());
    }

    getInformationsOfCategorie(unix : string) : Observable<Information[]>{
        return this.http.get(this.baseUrl+"categories/" + unix + "/enfants/informations").map(res => res.json());
    }
}
