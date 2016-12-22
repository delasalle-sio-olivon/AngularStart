import { Component, OnInit, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Import model
 */
import { Categorie } from '../../../model/Categorie';
import { Information } from '../../../model/Information';

import { SauvegardeService } from '../service/sauvegarde.provider';
@Component({
    moduleId: module.id,
    selector: 'categorieEditor',
    templateUrl: 'view/categorieeditor.component.html',
    styleUrls : ['css/categorieeditor.component.css']
})
export class CategorieEditorComponent implements OnInit {
    new : boolean;
    oldCategorieSelected : Categorie;
    categorieSelected : Categorie;
    img : any;
    @Input('categorieSelected')
    set categorieSelect(value : Categorie){
        this.categorieSelected = value;
        if(value !== undefined && value !== null){
            this.oldCategorieSelected = new Categorie(value.unix, value.titre, value.resume, value.detail);
            this.img = '../resources/views/front/app/ressource/img/' + this.categorieSelected.unix + '.png';
        }
    }

    @Output() catDelete : EventEmitter<any>;

    constructor( private sanitizer:DomSanitizer, private sauvegarde : SauvegardeService ) {
        this.catDelete = new EventEmitter<any>();
     }

    ngOnInit() { 

    }

    hasCategorieSelected(){
        if(this.categorieSelected !== null && this.categorieSelected !== undefined){
            return true;
        }
        return false;
    }

    startNew(){
        this.new = true;
    }

    stopNew(){
        this.new = false;
    }

    isNew(){
        return this.new;
    }

    checkForChange(action : number){
        let change : boolean = false;
        switch (action) {
            case 1:
                if(this.categorieSelected.titre !== this.oldCategorieSelected.titre){
                    change = true;
                }
                break;
            case 2:
                if(this.categorieSelected.unix !== this.oldCategorieSelected.unix){
                    change = true;
                }
                break;
            case 3:
                if(this.categorieSelected.resume !== this.oldCategorieSelected.resume){
                    change = true;
                }
                break;
            case 4:
                if(this.categorieSelected.unix !== this.oldCategorieSelected.unix){
                    change = true;
                }
                break;
        
            default:
                break;
        }
        if(change){
            this.change();
        }
    }

    change(){
        this.sauvegarde.markCatAsChange(this.categorieSelected);
    }

    delete(){
        this.sauvegarde.delCat(this.categorieSelected);
        this.catDelete.emit();
    }

    titreClass(){
        let bool : boolean = this.titreIsOk();
        return { "has-error" :  !bool, "has-feedback" : !bool};
    }

    titreIsOk(){
        if(this.categorieSelected.titre.length<1){
            return false;
        }
        return true;
    }

    unixClass(){
        let bool : boolean = this.unixIsOk();
        return { "has-error" :  !bool, "has-feedback" : !bool};
    }

    unixIsOk(){
        //let bool : boolean = ;
        if(this.categorieSelected.unix.length<1 || !this.unixIsUnique()){
            return false;
        }
        return true;
    }

    unixIsUnique(){
        let cat : Categorie = this.sauvegarde.categories.find(cat=>{
            if(cat.unix === this.categorieSelected.unix && cat.id !== this.categorieSelected.id){
                return true;
            }
            return false
        });

        let info : Information = this.sauvegarde.informations.find(info=>{
            if(info.unix === this.categorieSelected.unix){
                return true;
            }
            return false
        });

        if(cat === undefined && info === undefined){
            return true;
        }
        return false;
    }

    resumeClass(){
        let bool : boolean = this.resumeIsOk();
        return { "has-warning" :  !bool, "has-feedback" : !bool};
    }

    resumeIsOk(){
        if(this.categorieSelected.resume.length<1){
            return false;
        }
        return true;
    }

    isFirstOfFirst() : boolean{
        if(this.categorieSelected.unix === "firstoffirst"){
            return true;
        }
        return false;
    }

    imgChange(input : any){
        this.img = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(input.files[0]));
        //this.imgs[this.categorieSelected.unix] = input.file[0];
    }
}