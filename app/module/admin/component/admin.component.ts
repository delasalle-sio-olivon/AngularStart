import { Component, OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
/**
 * Import providers
 */
import { CategorieProvider } from '../../../service/categorie.provider';
import { InformationProvider } from '../../../service/information.provider';
import { ServiceProvider } from '../../../service/service.provider';
import { SauvegardeService } from '../service/sauvegarde.provider';

/**
 * Import model
 */
import { Categorie } from '../../../model/Categorie';
import { Information } from '../../../model/Information';


@Component({
    moduleId: module.id,
    selector: 'admin',
    templateUrl: 'view/admin.component.html',
    styleUrls : ['css/admin.component.css'],
    providers : [CategorieProvider, ServiceProvider, InformationProvider]
})
export class AdminComponent implements OnInit {
    ready : boolean;    
    //true quand une sauvegarde c'est fini et bien déroulé
    saveEnded : boolean;
    //categorie selectionné par l'utilisateur dans l'arbre
    categorieSelected : Categorie;
    //information selectionné dans l'arbre
    informationSelected : Information;

    constructor(private categorieService : CategorieProvider, private informationService : InformationProvider, private sauvegarde : SauvegardeService) { 
      this.ready = false;
    }

    ngOnInit() { 
      //on indique que le composant est pret à afficher
      this.sauvegarde.init().subscribe(res=>{
        console.log(this.sauvegarde);
        this.start();
      });        
    }

    /**
     * Sélectionne une catégorie, déselectionne une information si il y en a
     */
    selectCategorie(categorie : Categorie){
      this.unselectInformation(); 
      this.categorieSelected = categorie;
    }

    /**
     * Déselectionne une catégorie
     */
    unselectCategorie(){
      this.categorieSelected = null;
    }

    /**
     * Sélectionne une information, déselectionne une catégorie si il y en a
     */
    selectInformation(info : Information){
      this.unselectCategorie()
      this.informationSelected = info;  
    }
    
    /**
     * Déselectionne une information
     */
    unselectInformation(){
      this.informationSelected = null;
    }

    
    /**
     * Creation d'une nouvelle catégorie
     */
    newCategorie() : void {
      
      this.selectCategorie(this.sauvegarde.newCategorie());
      
    }

    /**
     * Creation d'une nouvelle information
     */
    newInformation() : void {

      this.selectInformation(this.sauvegarde.newInformation());

    }

    /**
     * Sauvegarde les changements apporté
     */
    saveChanges(){
      this.sauvegarde.saveChanges();
    }

    

    /**
     * Supprime une catégorie de l'interface
     *  */
    deleteCat(){
      //supprime les liens concerné par la catégorie supprimé
      this.unselectCategorie();
    }

    /**
     * Supprime une info de l'interface
     *  */
    deleteInfo(){
      this.unselectInformation();
    }

    start(){
      this.ready = true;
    }

    isReady() : boolean{
      return this.ready;
    }
}