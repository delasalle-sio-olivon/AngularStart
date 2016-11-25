import { Injectable } from '@angular/core';
import { ServiceProvider } from './service.provider';
import { Observable }     from 'rxjs/Observable';
import { Link } from '../model/Link';

/**
 * Model imports
 */
import { Information } from '../model/Information';
//fourni les Information
@Injectable()
export class InformationProvider {
    constructor(private service : ServiceProvider) { 

    }

    getInformation(unix : string) : Observable<Information> {
        return this.service.getInformation(unix);
    }

    getInformationsOfCategorie(unix : string) : Observable<Information[]>{
        return this.service.getInformationsOfCategorie(unix);
    }
    
    getAllInformations() : Observable<Information[]>{
        return this.service.getInformations();
    }

    updateInformations(infos : Information[]) : Observable<any>{
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
        let obs : Observable<any>[] = new Array();

        links.forEach(link=>{
            obs.push(this.service.postLinkInfo(link));
        })

        return Observable.forkJoin(obs);
    }

    addInfos(infos : Information[]) : Observable<number[]>{
        let obs : Observable<any>[] = new Array();
        
        infos.forEach(info=>{
            obs.push(this.service.postInformation(info));
        });
        return Observable.forkJoin(obs);
    }

    deleteInformations(infos : Information[]){
        let obs : Observable<any>[] = new Array(); 
        infos.forEach(info => {
            obs.push(this.service.deleteInformation(info.id));
        });
        return Observable.forkJoin(obs);
    }

    addCategorieEnfants(links : Link[]){
        let obs : Observable<any>[] = new Array(); 
        links.forEach(link => {
            obs.push(this.service.postLinkInfo(link));
        });
        return Observable.forkJoin(obs);
    }

    delCategorieEnfants(links : Link[]){
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
