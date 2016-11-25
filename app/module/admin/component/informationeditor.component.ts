import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FileUploader } from 'ng2-file-upload';

import { SauvegardeService } from '../service/sauvegarde.provider';
/**
 * Import model
 */
import { Categorie } from '../../../model/Categorie';
import { Information } from '../../../model/Information';

@Component({
    moduleId: module.id,
    selector: 'informationEditor',
    templateUrl: 'view/informationeditor.component.html',
    styleUrls : ['css/informationeditor.component.css']
})
export class InformationEditorComponent implements OnInit {
    informationSelected : Information;
    oldInformationSelected : Information;
    img : any;
    @Input('informationSelected')
    set informationSelec (value: Information){
        this.informationSelected = value;
        if(this.informationSelected !== null && this.informationSelected !== undefined ){
            this.oldInformationSelected = new Information(value.unix, value.titre, value.resume, value.detail);
            //on forme l'url de l'img
            this.sauvegarde.uploaders[this.informationSelected.id] = new FileUploader({url: 'http://localhost/lumen/public/api/images/informations/' + this.informationSelected.id });
            this.img = '../resources/views/front/app/ressource/images/informations/' + this.informationSelected.id + '.png';
            
        }
    }

    @Output() infoDelete : EventEmitter<Information>;

    constructor(private sanitizer:DomSanitizer, private sauvegarde : SauvegardeService) { 
        this.infoDelete = new EventEmitter<Information>();
        
    }

    ngOnInit() { }

    hasInformationSelected(){
        if(this.informationSelected === undefined || this.informationSelected === null){
            return false;
        }
        return true;
    }

    isNew(){
        return false;
    }

    checkForChange(action : number){
        let change : boolean = false;
        switch (action) {
            case 1:
                if(this.oldInformationSelected.titre !== this.informationSelected.titre){
                    change = true;
                }
                break;
            case 2:
                if(this.oldInformationSelected.unix !== this.informationSelected.unix){
                    change = true;
                }
                break;
            case 1:
                if(this.oldInformationSelected.resume !== this.informationSelected.resume){
                    change = true;
                }
                break;
            case 1:
                if(this.oldInformationSelected.detail !== this.informationSelected.detail){
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
        this.sauvegarde.markInfoAsChange(this.informationSelected);
    }

    delete(){
        this.sauvegarde.delInfo(this.informationSelected);
        this.infoDelete.emit();
    }

    titreClass(){
        let bool : boolean = this.titreIsOk();
        return { "has-error" :  !bool, "has-feedback" : !bool};
    }
    titreIsOk(){
        if(this.informationSelected.titre.length<1){
            return false;
        }
        return true;
    }

    unixClass(){
        let bool : boolean = this.unixIsOk();
        return { "has-error" :  !bool, "has-feedback" : !bool};
    }

     unixIsOk(){
        if(this.informationSelected.unix.length<1 || !this.unixIsUnique()){
            return false;
        }
        return true;
    }
    unixIsUnique(){
        let cat : Categorie = this.sauvegarde.categories.find(cat=>{
            if(cat.unix === this.informationSelected.unix){
                return true;
            }
            return false
        });

        let info : Information = this.sauvegarde.informations.find(info=>{
            if(info.unix === this.informationSelected.unix && info.id !== this.informationSelected.id){
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
        if(this.informationSelected.resume.length<1){
            return false;
        }
        return true;
    }

    imgChange(input : any){
        //on utilise le sanitizer pour prévenir que l'url n'est pas dangeureuse
        this.img = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(input.files[0]));
    }
}