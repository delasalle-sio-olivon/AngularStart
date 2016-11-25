import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
/**
 * Import model
 */
import { Categorie } from '../../../model/Categorie';
import { Information } from '../../../model/Information';
import { Link } from '../../../model/Link';

import { SauvegardeService } from '../service/sauvegarde.provider';
@Component({
    moduleId: module.id,
    selector: 'parentInfoEditor',
    templateUrl: 'view/parentinfoeditor.component.html',
    styleUrls : ['css/parentinfoeditor.component.css']
})
export class ParentInfoEditorComponent implements OnInit {
    liste : any[];
    parent : any[];
    a : any[];
    oldInfoId : number;
    value : any;
    constructor(private sauvegarde : SauvegardeService) { 
        this.liste = new Array();
        this.parent = new Array();
    }

    @Input() informationSelected : Information;

    ngOnInit() { }
    
    ngDoCheck(){        
        if(this.oldInfoId !== this.informationSelected.id){
            this.oldInfoId = this.informationSelected.id;
            this.getCatParent();
            this.getSelectList();
        }
    }

    public selected(value:any):void {
        this.sauvegarde.addInfoLink(new Link(value.id,this.informationSelected.id));
    }

    public removed(value:any):void {
        this.sauvegarde.delInfoLink(new Link(value.id,this.informationSelected.id));
    }

    public refreshValue(value:any):void {
        this.value = value;
    }

    getCatParent(){
        let parent : any[] = new Array();
        Link.filterByIdEnfant(this.sauvegarde.linksInfo, this.informationSelected.id)
        .forEach(link=>{
            let cat = Categorie.getInArrayById(this.sauvegarde.categories,link.idParent);
            parent.push({ id : cat.id, text : cat.unix });
        });
        this.parent = parent;
    }

    getSelectList() : void{
       this.sauvegarde.categories.forEach(cat => {
           this.liste.push({id : cat.id, text : cat.unix});
       });
    }
}