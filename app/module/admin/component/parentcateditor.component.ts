import { Component, OnInit, DoCheck, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

import { SauvegardeService } from '../service/sauvegarde.provider';

import { Categorie } from '../../../model/Categorie';
import { Link } from '../../../model/Link';

@Component({
    moduleId: module.id,
    selector: 'parentCatEditor',
    templateUrl: 'view/parentcateditor.component.html',
    styleUrls : ["css/ng2-select.css"]
})
export class ParentCatEditorComponent implements OnInit {

    liste : any[];
    parent : any[];
    a : any[];
    oldCatId : number;

    constructor(private sauvegarde : SauvegardeService) { 
        this.liste = new Array();
        this.parent = new Array();
    }

    @Input() categorieSelected : Categorie;

    ngOnInit() { }
    
    ngDoCheck(){        
        if(this.oldCatId !== this.categorieSelected.id){
            this.oldCatId = this.categorieSelected.id;
            this.getCatParent();
            this.getSelectList();
        }
    }

    private value:any;

    public selected(value:any):void {
        this.sauvegarde.addCatLink(new Link(value.id,this.categorieSelected.id));
        this.getSelectList();
    }

    public removed(value:any):void {
        this.sauvegarde.delCatLink(new Link(value.id,this.categorieSelected.id));
        this.getSelectList();
    }

    public refreshValue(value:any):void {
        this.value = value;
    }

    getCatParent(){
        this.parent = new Array();
        Link.filterByIdEnfant(this.sauvegarde.linksCat,this.categorieSelected.id)
        .forEach(link => {
            let cat : Categorie = Categorie.getInArrayById(this.sauvegarde.categories,link.idParent);
            let a : any = {
                id : cat.id,
                text : cat.unix
            };
            this.parent.push(a);
        });
    }

    getSelectList() : void{
        this.liste = new Array();
        this.sauvegarde.categories.filter(cat=>{
            if(cat.id === this.categorieSelected.id){
                return false;
            }
            if(Categorie.getInArrayById(this.categorieSelected.categories, cat.id) === null){
                return true;
            }
            return false;
        }).forEach(cat => {
            let a = {
                id : cat.id,
                text : cat.unix 
            };
            this.liste.push(a);
        });
    }

}