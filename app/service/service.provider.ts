import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
/**
 * Model imports
 */
import { Categorie } from '../model/Categorie';
import { Information } from '../model/Information';
import { Link } from '../model/Link';

//fourni les données peux les garder en cache
@Injectable()
export class ServiceProvider {

    baseUrl : string = "http://portail.tyforge-dev.in.ac-rennes.fr/api/";
    baseUrlTyForge : string = "http://tyforge-dev.in.ac-rennes.fr/plugins/ws/";
    constructor(private http : Http, private jsonp : Jsonp) { 
       
    }
    
    getFirstCategories() : Observable<Categorie[]>{
        return this.http.get(this.baseUrl+"categories/firstoffirst/enfants/categories").map(res => res.json()).cache().retry(5);
    }

    getCategorieEnfants(unix : string) : Observable<Categorie[]>{
        return this.http.get(this.baseUrl+"categories/" + unix + "/enfants/categories").map(res => res.json()).cache().retry(5);
    }

    getCategorie(unix : string) : Observable<Categorie> {
        return this.http.get(this.baseUrl+"categories/" + unix).map(res => res.json()).cache().retry(5);
    }

    getInformation(unix : string) : Observable<Information>{
        return this.http.get(this.baseUrl+"informations/" + unix).map(res => res.json()).cache().retry(5);
    }

    getInformations() : Observable<Information[]>{
        return this.http.get(this.baseUrl+"informations").map(res => res.json()).cache().retry(5);
    }

    getInformationsOfCategorie(unix : string) : Observable<Information[]>{
        return this.http.get(this.baseUrl+"categories/" + unix + "/enfants/informations").map(res => res.json()).cache().retry(5);
    }

    getAllCategories() : Observable<Categorie[]>{
        return this.http.get(this.baseUrl+"categories").map(res => res.json()).cache().retry(5);
    }

    putCategorie(categorie : Categorie) : Observable<any>{
        return this.http.put(this.baseUrl+"categories", categorie).map(res => res.json()).cache().retry(5);
    }

    putInformation(information : Information) : Observable<any>{
        return this.http.put(this.baseUrl+"informations", information).map(res => res.json()).cache().retry(5);
    }

    getLinks() : Observable<Link[]> {
        return this.http.get(this.baseUrl+"links/categories").map(res => res.json()).cache().retry(5);
    }

    replaceLinks(links : any) : Observable<any>{
        return this.http.put(this.baseUrl+"links/categories", links).map(res => res.json()).cache().retry(5);
    }

    getLinksInfos() : Observable<Link[]> {
        return this.http.get(this.baseUrl+"links/informations").map(res => res.json()).cache().retry(5);
    }
    
    replaceLinksInfos(links : any) : Observable<any>{
        return this.http.put(this.baseUrl+"links/informations", links).map(res => res.json()).cache().retry(5);
    }

    postCategorie(categorie : Categorie) : Observable<number>{
        return this.http.post(this.baseUrl+"categories", categorie).map(res => res.json()).cache().retry(5);
    }

    postInformation(information : Information) : Observable<number>{
        return this.http.post(this.baseUrl+"informations", information).map(res => res.json()).cache().retry(5);
    }

    postLinkCat(link : Link){
        return this.http.post(this.baseUrl+"links/categories", link).map(res => res.json()).cache().retry(5);
    }

    postLinkInfo(link : Link){
        console.log("wut");
        return this.http.post(this.baseUrl+"links/informations", link).map(res => res.json()).cache().retry(5);
    }

    deleteLinkCat(link : Link){
        return this.http.delete(this.baseUrl+"links/categories/"+link.idParent+"/"+link.idEnfant).map(res => res.json()).cache().retry(5);
    }

    deleteLinkInfo(link : Link){
        return this.http.delete(this.baseUrl+"links/informations/"+link.idParent+"/"+link.idEnfant).map(res => res.json()).cache().retry(5);
    }

    deleteCategorie(id : number) : Observable<any>{
        return this.http.delete(this.baseUrl+"categories/"+id).map(res => res.json()).cache().retry(5);
    }

    deleteInformation(id : number) : Observable<any>{
        return this.http.delete(this.baseUrl+"informations/"+id).map(res => res.json()).cache().retry(5);
    }

    putImgInfo(img : any, id : number){
        return this.http.put(this.baseUrl + "images/informations/"+ id , img);
    }

    getUserUnixName() : Observable<string>{
        return this.http.get(this.baseUrl+"user").map(res => res.json()).cache().retry(5);
    }

    getUserRealName(unix : String) : Observable<string>{
        return this.http.get(this.baseUrlTyForge+"?0=users&1=" + unix + "&2=name").map(res => res.json()).cache().retry(5);
    }

    getUserProjects(unix : String) : Observable<any>{
        return this.http.get(this.baseUrlTyForge+"?0=users&1=" + unix + "&2=projects").map(res => res.json()).cache().retry(5);
    }

}
