/**
 * Import angular
 */
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  } from 'rxjs/Observable';
/**
 * Import model
 */
import { FileDAriane } from '../model/FileDAriane';
import { Recherche } from '../model/Recherche';
import { Categorie } from '../model/Categorie';
import { Information } from '../model/Information';

/**
 * Import providers
 */
import { CategorieProvider } from '../service/categorie.provider';
import { InformationProvider } from '../service/information.provider';
/**
 * Main Component traduit le corps de l'application
 */
@Component({
    selector: 'main',
    templateUrl: 'app/view/main.component.html',
    styleUrls : ["app/css/main.component.css"],
    providers : [CategorieProvider, InformationProvider]
})
export class MainComponent implements OnInit { 

    /**
     * Attribut
     */
    //correspond au params de la route
    fileDAriane : string[];
    recherche : Recherche;
    categorieSelected : Categorie;
    categories : Categorie[];
    informationSelected : Information;
    informations : Information[];
    nbCol : number;
    col : number[];
    paramsSubscription: any;//any devrait etre de type Subscription mais je le trouves pas
    /**
     * Constructeur
     */
    constructor(private categorieService : CategorieProvider, private informationService : InformationProvider, private router: Router, private route: ActivatedRoute){
        this.fileDAriane = new Array();
        this.recherche = new Recherche();
        this.categories = new Array();
        this.informations = new Array();
    }
    /**
     * Cycle de vie (a chaque nouvelle instance cette fonction s'éxecute elle permet d'éviter certain bug du Constructeur)
     */
    ngOnInit() {
        //le nombre de colonne dans les quels seronts les Categories
        this.nbCol = 3;
        //le tableau nous permet juste de pourvoir fair une boucle dans la partie vue
        this.col = new Array(this.nbCol);

        //on regarde les params de la route
        this.paramsSubscription = this.route.params.subscribe(params => {
            //tableau de params
            let ids : string[] = new Array();

            //Il y a beaucoup de if car les routes sont faites à la main 
            //si le params existe on le push dans le tableau            
            if(params['categorie1'] != undefined){
                ids.push(params['categorie1']);
                if(params['categorie2'] != undefined){
                    ids.push(params['categorie2']);
                    if(params['categorie3'] != undefined){
                        ids.push(params['categorie3']);
                        if(params['categorie4'] != undefined){
                            ids.push(params['categorie4']);
                            if(params['categorie5'] != undefined){
                                ids.push(params['categorie5']);
                            }
                        }
                    }
                }
                //si il y a au moins un params

                //on récupère le dernier qui correspond au composite séléctionné
                let unix = ids.pop();
                //on cherche une catégorie via cet unix
                this.categorieSelected = this.categorieService.getCategorie(unix);
                if(this.hasCategorieSelected()){
                    //si elle exite
                    //on récupère ses enfants
                    this.categories = this.categorieService.getCategorieEnfants(unix);
                    this.informations = this.informationService.getInformationsOfCategorie(unix);
                    //et on peut affirmer qu'il n'y a pas d'information selectioné
                    this.informationSelected = null;
                }else{
                    //sinon c'est une information et donc on la récupère
                    this.informationSelected = this.informationService.getInformation(unix);
                }
                //on construit ensuite le fileDAriane
                ids.forEach(unixFile => {
                    this.fileDAriane.push(unixFile);
                });
                //on rajoute le composite séléctionné car on l'a enlevé via le pop()
                this.fileDAriane.push(unix);
            }else{
                //si il n'y a pas de params on est donc sans compositeSelectionné et au niveau /portail 
                this.categorieSelected = null;
                this.informationSelected = null;
                this.categories = this.categorieService.getFirstCategories();
            }
            
        });
        //au cas ou on est un type undefined (!= null)
        if(this.categorieSelected === undefined){
            this.categorieSelected = null;
            this.categories = this.categorieService.getFirstCategories();
        }
        if(this.informationSelected === undefined){
            this.informationSelected = null;
        }
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }

    /**
     * Evenements
     */


    /**
     * Méthodes
     */

    hasCategorieSelected() : boolean{
        if(this.categorieSelected === null){
            return false;
        }
        return true;
    }
    
    hasCategories() : boolean {
        if (this.categories.length>0){
            return true;
        }
        return false;
    }

    hasInformationSelected() : boolean{
        if(this.informationSelected === null){
            return false;
        }
        return true;
    }

    hasInformations() : boolean {
        if (this.informations.length>0){
            return true;
        }
        return false;
    }

}