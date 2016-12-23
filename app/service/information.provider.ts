import { Injectable } from '@angular/core';
import { ServiceProvider } from './service.provider';
import { Observable }     from 'rxjs/Observable';
import { Link } from '../model/Link';

/**
 * Model imports
 */
import { Information } from '../model/Information';
import { Categorie } from '../model/Categorie';
//fourni les Information
@Injectable()
export class InformationProvider {

    informations : Information[];
    enfants : Categorie[];
    haveAll : Boolean;
    constructor(private service : ServiceProvider) { 
        this.informations = new Array();
        this.enfants = new Array();
        this.haveAll = false;
    }

    resetDatas(){
        this.informations = new Array();
        this.enfants = new Array();
        this.haveAll = false;
    }

    getInformation(unix : string) : Observable<Information> {
        if(this.informations.length>0){
            let info = Information.getInArrayByUnix(this.informations, unix);
            if(info !== null){
                return Observable.of(info);
            }
        }
        let request = this.service.getInformation(unix);
        request.subscribe(res=>{
            this.informations.push(res);
        });
        return request;
    }

    getInformationsOfCategorie(unix : string) : Observable<Information[]>{
        let cat = Categorie.getInArrayByUnix(this.enfants, unix);
        if(cat !== null){
            return Observable.of(cat.informations);
        }
        let request = this.service.getInformationsOfCategorie(unix);
        request.subscribe(res=>{
            let cat = new Categorie(unix, '','','');
            cat.informations = res;
            this.enfants.push(cat);
            this.informations.concat(res);
        });
        return request;
    }
    
    getAllInformations() : Observable<Information[]>{
        if(this.haveAll){
            return Observable.of(this.informations);
        }
        let request = this.service.getInformations();
        request.subscribe(res=>{
            this.informations = res;
        });
        this.haveAll = true;
        return request;
    }

    updateInformations(infos : Information[]) : Observable<any>{
        this.resetDatas();
        let a  = new Array();
        infos.forEach(info=>{
            a.push(this.service.putInformation(info));
        })
        return Observable.forkJoin(a);
    }

    getAllLinks() : Observable<Link[]>{
        return this.service.getLinksInfos();
    }

    replaceLinksInfos(links : any) : Observable<any>{
        return this.service.replaceLinksInfos(links);
    }

    updateInformationsParentsByUnix(links : any[]) : Observable<any>{
        this.resetDatas();
        let obs : Observable<any>[] = new Array();

        links.forEach(link=>{
            obs.push(this.service.postLinkInfo(link));
        })

        return Observable.forkJoin(obs);
    }

    addInfos(infos : Information[]) : Observable<number[]>{
        this.resetDatas();
        let obs : Observable<any>[] = new Array();
        
        infos.forEach(info=>{
            obs.push(this.service.postInformation(info));
        });
        return Observable.forkJoin(obs);
    }

    deleteInformations(infos : Information[]){
        this.resetDatas();
        let obs : Observable<any>[] = new Array(); 
        infos.forEach(info => {
            obs.push(this.service.deleteInformation(info.id));
        });
        return Observable.forkJoin(obs);
    }

    addCategorieEnfants(links : Link[]){
        this.resetDatas();
        let obs : Observable<any>[] = new Array(); 
        links.forEach(link => {
            obs.push(this.service.postLinkInfo(link));
        });
        return Observable.forkJoin(obs);
    }

    delCategorieEnfants(links : Link[]){
        this.resetDatas();
        let obs : Observable<any>[] = new Array(); 
        links.forEach(link => {
            obs.push(this.service.deleteLinkInfo(link));
        });
        return Observable.forkJoin(obs);
    }

    uploadImgs(imgs : any[]) : Observable<any>{
        let obs : Observable<any>[] = new Array();
        imgs.forEach((img,index)=>{
            obs.push(this.service.putImgInfo(img,index));
        });
        return Observable.forkJoin(obs);
    }
}
