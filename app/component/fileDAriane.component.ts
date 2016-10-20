import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../app.routes';
/**
 * Model import
 */
import { Categorie } from '../model/categorie';
import { FileDAriane } from '../model/FileDAriane';


/**
 * Providers imports (et Utils)
 */
import { Utils } from '../service/Utils';

@Component({
    selector: 'file-d-ariane',
    templateUrl: 'app/view/fileDAriane.component.html',
    providers : [Router]
})
export class FileDArianeComponent implements OnInit {
    fileDAriane : FileDAriane;
    @Output() newCategorieSelected = new EventEmitter<Categorie>();
    @Input('categorieSelected')
    
    set categorieSelected(value : Categorie) {
        if(value !== null){
            this.fileDAriane.position.push(value);
            //this.router.navigate([this.makeLink(this.fileDAriane.position.length-1)]);
        }else{
            
        }
    }

    constructor(private router: Router) { 
        this.fileDAriane = new FileDAriane;
    }

    ngOnInit() { }

    isHome() : boolean{
        if(this.fileDAriane.position.length>0){
            return false;
        }
        return true;
    }

    selectCategorie(index : number){
        if(index != this.fileDAriane.position.length-1){
            let categorie : Categorie;
            for(let i = this.fileDAriane.position.length-1 ; i >= index ; i--){
                categorie = this.fileDAriane.position.pop();
            }
            this.fileDAriane.position = this.fileDAriane.position.slice(0,index);
            this.newCategorieSelected.emit(categorie);
        }
        /**TODO : Un rechargement de page ? Que faire si on clique sur la cat sur la quelle on est */
    }

    makeLink(index : number) : string{
        let res : string = "/";
        for(let i : number = 0; i<=index ; i++){
            res += Utils.replaceSpaceByUnderscore(this.fileDAriane.position[i].titre) + "/";
        }
        return res;
    }
}