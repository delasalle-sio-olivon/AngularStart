import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * Import model
 */
import { Categorie } from '../../../model/Categorie';
import { Information } from '../../../model/Information';

@Component({
    moduleId: module.id,
    selector: 'tree',
    templateUrl: 'view/tree.component.html',
    styleUrls : ['css/tree.component.css']
})
export class TreeComponent implements OnInit {
    
    show : boolean;

    @Input() data : Categorie;
    @Output() categorieSelected = new EventEmitter<Categorie>();
    @Output() informationSelected = new EventEmitter<Information>();

    constructor() { 
        this.informationSelected = new EventEmitter<Information>();
        this.categorieSelected = new EventEmitter<Categorie>();
    }

    ngOnInit() { 
        if(this.isFirst()){
            this.hideMe();
        }else{
            this.showMe();
        }
    }

    select() : void{
        this.categorieSelected.emit(this.data);
    }

    selectInformation(info : Information){
        this.informationSelected.emit(info);
    }

    selectCategorie(categorie : Categorie) : void{
        this.categorieSelected.emit(categorie);
    }

    isFirst(){
        if(this.data.unix === "Invisble"){
            return true;
        }
        return false;
    }

    isShow() : boolean {
        return this.show;
    }

    toggleShow() : void {
        if(this.isShow()){
            this.hideMe();
        }else{
            this.showMe();
        }
    }

    showMe() : void {
        this.show = true;
    }

    hideMe() : void{
        this.show = false;
    }
}