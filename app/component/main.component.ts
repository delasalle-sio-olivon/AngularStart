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
import { ServiceProvider } from '../service/service.provider';

/**
 * Main Component traduit le corps de l'application
 */
@Component({
    moduleId: module.id,  
    selector: 'main',
    templateUrl: 'view/main.component.html',
    styleUrls : ["css/main.component.css"],
    providers : [CategorieProvider, InformationProvider, ServiceProvider]
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
    paramsSubscription: any;//any devrait etre de type Subscription
    //sert a éviter d'afficher des informations incomplete/inéxistante lors de l'init
    loading : boolean;
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
        this.startLoading();
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
                this.categorieService.getCategorie(unix).subscribe(res => {
                    this.categorieSelected = res;
                    if(this.hasCategorieSelected()){
                        //si elle exite
                        //on récupère ses enfants
                        this.categorieService.getCategorieEnfants(unix).subscribe( res => {
                            this.categories = res;
                            if(!this.hasCategories()){
                                //si il n'y a pas de catégories dans ce cas il y des information normalement
                                this.informationService.getInformationsOfCategorie(unix).subscribe( res => {
                                    this.informations = res;
                                    this.stopLoading();
                                });
                            }else{
                                this.stopLoading();
                                //on récupère les catégories enfants de chaque catégories pour faire la petite liste.
                                this.categories.forEach(cat=>{
                                    this.categorieService.getCategorieEnfants(cat.unix).subscribe(res=>{
                                        cat.categories = res;
                                        if(cat.categories.length<1){
                                            //si il n'y en a pas on récupère les informations enfants
                                            this.informationService.getInformationsOfCategorie(cat.unix).subscribe(infos=>{
                                                cat.informations = infos;
                                                if(cat.informations.length>3){
                                                    cat.informations = cat.informations.slice(0,2);
                                                }
                                            });

                                        }else if(cat.categories.length > 3 ){
                                            cat.categories = cat.categories.slice(0,2);
                                        }
                                    });
                                });
                            }
                        });
                        //et on peut affirmer qu'il n'y a pas d'information selectioné
                        this.informationSelected = null;
                    }else{
                        //sinon c'est une information et donc on la récupère
                        this.informationService.getInformation(unix).subscribe( res => {
                            this.informationSelected = res;
                            this.stopLoading();
                        });
                    }
                });
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
                this.categorieService.getFirstCategories().subscribe( res => {
                    this.categories = res;
                    this.stopLoading();
                    this.categories.forEach(cat=>{
                        this.categorieService.getCategorieEnfants(cat.unix).subscribe(res=>{
                            cat.categories = res;
                            if(cat.categories.length<1){
                                //si il n'y en a pas on récupère les informations enfants
                                this.informationService.getInformationsOfCategorie(cat.unix).subscribe(infos=>{
                                    cat.informations = infos;
                                    if(cat.informations.length>3){
                                        cat.informations = cat.informations.slice(0,2);
                                    }
                                });

                            }else if(cat.categories.length > 3 ){
                                cat.categories = cat.categories.slice(0,2);
                            }
                        });
                    });
                });
            }
            
        });

        
        
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }

    /**
     * Méthodes
     */

    /**
     * Test si le component a une categorieSelected non null/undefined
     */
    hasCategorieSelected() : boolean{
        if(this.categorieSelected === null || this.categorieSelected === undefined){
            return false;
        }
        return true;
    }

    /**
     * Test si le composant a des catégories
     */
    hasCategories() : boolean {
        if (this.categories.length>0){
            return true;
        }
        return false;
    }

    /**
     * Test si le component a une informationSelected non null/undefined
     */
    hasInformationSelected() : boolean{
        if(this.informationSelected === null || this.informationSelected === undefined){
            return false;
        }
        return true;
    }

    /**
     * Test si le composant a des informations
     */
    hasInformations() : boolean {
        if (this.informations.length>0){
            return true;
        }
        return false;
    }

    /**
     * Test si on est a la racine du portail ou non
     */
    isHome() : boolean{
        if(!this.hasCategorieSelected() && !this.hasInformationSelected() && !this.isLoading() ){
            return true;
        }else{
            return false;
        }
    }
    /**
     * Test si on est en train de charger des données
     */
    isLoading() : boolean{
        //si ces 2 données ne sont pas défini alors la page n'en n'est qu'a son charg
        return this.loading;
    }

    /**
     * Notifie le début du chargement
     */
    startLoading() : void {
        this.loading = true;
    }
    
    /**
     * Notifie la fin du chargement
     */
    stopLoading() : void {
        this.loading = false;
    }
}