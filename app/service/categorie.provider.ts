import { Injectable } from '@angular/core';
import { ServiceProvider } from './service.provider';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
/**
 * Model imports
 */
import { Categorie } from '../model/Categorie';
import { Link } from '../model/Link';
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

    getAllCategories() : Observable<Categorie[]>{
        return this.service.getAllCategories();
    }

    getLinks() : Observable<Link[]>{
        return this.service.getLinks();
    }

    updateCategories(categories : Categorie[]){
        let observables : Observable<any>[] = new Array();
        categories.forEach(cat=>{
            observables.push(this.service.putCategorie(cat));
        });
        return Observable.forkJoin(observables);
    }

    updateCategorieEnfants(links : any) : Observable<any>{
        return this.service.replaceLinks(links);
    }

    updateCategorieEnfantByUnix(links : any[]) : Observable<any>{
        let obs : Observable<any>[] = new Array();
        links.forEach(link => {
            obs.push(this.service.postLinkCat(link));
        });
        return Observable.forkJoin(obs);
    }

    addCategories(categories : Categorie[] ) : Observable<number[]>{
        let obs : Observable<any>[] = new Array(); 
        categories.forEach(categorie => {
            obs.push(this.service.postCategorie(categorie));
        });
        return Observable.forkJoin(obs);
    }

    deleteCategories(cats : Categorie[]){
        let obs : Observable<any>[] = new Array(); 
        cats.forEach(cat => {
            obs.push(this.service.deleteCategorie(cat.id));
        });
        return Observable.forkJoin(obs);
    }

    addCategorieEnfants(links : Link[]){
        let obs : Observable<any>[] = new Array(); 
        links.forEach(link => {
            obs.push(this.service.postLinkCat(link));
        });
        return Observable.forkJoin(obs);
    }

    delCategorieEnfants(links : Link[]){
        let obs : Observable<any>[] = new Array(); 
        links.forEach(link => {
            obs.push(this.service.deleteLinkCat(link));
        });
        return Observable.forkJoin(obs);
    }
}
