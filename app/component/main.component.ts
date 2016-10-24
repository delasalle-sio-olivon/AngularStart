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

/**
 * Main Component traduit le corps de l'application
 */
@Component({
    selector: 'main',
    templateUrl: 'app/view/main.component.html',
    styleUrls : ["app/css/main.component.css"],
    providers : [CategorieProvider]
})
export class MainComponent implements OnInit { 

    /**
     * Attribut
     */
    fileDAriane : string[];
    recherche : Recherche;
    categorieSelected : Categorie;
    categories : Categorie[];
    informations : Information[];
    nbCol : number;
    col : number[];
    paramsSubscription: any;//any devrait etre de type Subscription mais je le trouves pas
    /**
     * Constructeur
     */
    constructor(private categorieService : CategorieProvider, private router: Router, private route: ActivatedRoute){
        this.fileDAriane = new Array();
        this.recherche = new Recherche();
        this.categories = new Array();
        this.informations = new Array();
    }
    /**
     * Cycle de vie
     */
    ngOnInit() {
        
        this.nbCol = 3;
        this.col = new Array(this.nbCol);
        this.paramsSubscription = this.route.params.subscribe(params => {
            let ids : string[] = new Array();
            
            /**
             * Il y a beaucoup de if car les routes sont faites à la main 
             */
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
                let unix = ids.pop();
                this.categorieSelected = this.categorieService.getCategorie(unix);
                this.categories = this.categorieService.getCategorieEnfants(unix);
                ids.forEach(unixFile => {
                    this.fileDAriane.push(unixFile);
                });
                this.fileDAriane.push(unix);
            }else{
                this.categorieSelected = null;
                this.categories = this.categorieService.getFirstCategories();
            }
            
        });
        if(this.categorieSelected === undefined){
            this.categorieSelected = null;
            this.categories = this.categorieService.getFirstCategories();
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


}