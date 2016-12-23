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
    first : Categorie[];
    enfants : Categorie[];
    haveAll : Boolean;
    constructor(private service : ServiceProvider) { 
        this.categories = new Array();
        this.first = new Array();
        this.enfants = new Array();
        this.haveAll = false;
    }
    
    resetDatas(){
        this.categories = new Array();
        this.enfants = new Array();
        this.first = new Array();
        this.haveAll = false;
    }

    getFirstCategories() : Observable<Categorie[]>{ 
        if(this.first.length>0){
            return Observable.of(this.first);
        }
        let request = this.service.getFirstCategories();
        request.subscribe(res=>{
            this.first = res;
            this.categories.concat(res);
        });
        return request;
    }

    getCategorieEnfants(unix : string) : Observable<Categorie[]> {
        let cat = this.enfants.find(find=>{
            if(find.unix == unix){
                return true;
            }
            return false;
        })
        if(cat !== undefined){
            return Observable.of(cat.categories);
        }
        let request = this.service.getCategorieEnfants(unix);
        request.subscribe(res=>{
            let cat = new Categorie(unix,'','','');
            cat.categories = res;
            this.enfants.push(cat);
            this.categories.concat(res);
        });
        return request;
    }

    getCategorie(unix : string) : Observable<Categorie>{
        if(this.categories.length>0){
            let cat = Categorie.getInArrayByUnix(this.categories,unix);
            if(cat !== null){
                return Observable.of(cat);
            }
        }
        let request = this.service.getCategorie(unix);
        request.subscribe(res=>{
            this.categories.push(res);
        });
        return request;
    }

    getAllCategories() : Observable<Categorie[]>{
        let request = this.service.getAllCategories();
        request.subscribe(res=>{
            this.categories = res;
        });
        this.haveAll = true;
        return request;
    }

    getLinks() : Observable<Link[]>{
        return this.service.getLinks();
    }

    updateCategories(categories : Categorie[]){
        let observables : Observable<any>[] = new Array();
        categories.forEach(cat=>{
            observables.push(this.service.putCategorie(cat));
        });
        this.resetDatas();
        return Observable.forkJoin(observables);
    }

    updateCategorieEnfants(links : any) : Observable<any>{
        this.resetDatas();
        return this.service.replaceLinks(links);
    }

    updateCategorieEnfantByUnix(links : any[]) : Observable<any>{
        let obs : Observable<any>[] = new Array();
        links.forEach(link => {
            obs.push(this.service.postLinkCat(link));
        });
        this.resetDatas();
        return Observable.forkJoin(obs);
    }

    addCategories(categories : Categorie[] ) : Observable<number[]>{
        let obs : Observable<any>[] = new Array(); 
        categories.forEach(categorie => {
            obs.push(this.service.postCategorie(categorie));
        });
        this.resetDatas();
        return Observable.forkJoin(obs);
    }

    deleteCategories(cats : Categorie[]){
        let obs : Observable<any>[] = new Array(); 
        cats.forEach(cat => {
            obs.push(this.service.deleteCategorie(cat.id));
        });
        this.resetDatas();
        return Observable.forkJoin(obs);
    }

    addCategorieEnfants(links : Link[]){
        let obs : Observable<any>[] = new Array(); 
        links.forEach(link => {
            obs.push(this.service.postLinkCat(link));
        });
        this.resetDatas();
        return Observable.forkJoin(obs);
    }

    delCategorieEnfants(links : Link[]){
        let obs : Observable<any>[] = new Array(); 
        links.forEach(link => {
            obs.push(this.service.deleteLinkCat(link));
        });
        this.resetDatas();
        return Observable.forkJoin(obs);
    }
}
