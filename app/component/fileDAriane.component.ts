import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Model import
 */
import { Categorie } from '../model/categorie';
import { FileDAriane } from '../model/FileDAriane';

/**
 * Providers imports
 */
import { CategorieProvider } from '../service/categorie.provider';
import { InformationProvider } from '../service/information.provider';

@Component({
    selector: 'file-d-ariane',
    templateUrl: 'app/view/fileDAriane.component.html',
    providers : [CategorieProvider, InformationProvider],
    styleUrls : ['app/css/fileDAriane.component.css']
})
export class FileDArianeComponent implements OnInit {
    fileDArianeObj : FileDAriane;
    //tableau de string correspondant au parametre de la route
    @Input() fileDAriane : string[];

    constructor(private categorieService : CategorieProvider, private informationService : InformationProvider, private router: Router, private route: ActivatedRoute) { 
        this.fileDArianeObj = new FileDAriane();
    }

    ngOnInit() {
        //pour chaque param on va chercher la catégorie ou l'information correspondante via l'unix
        this.fileDAriane.forEach(unix => {
            //on cherche en 1er la catégorie
            let cat : Categorie = this.categorieService.getCategorie(unix);
            if(cat !== null){
                //si ce n'est pas null alors c'est bien une catégorie
                this.fileDArianeObj.position.push(cat);
            }else{
                //sinon c'est une information et dans ce cas là on va la chercher maintenant
                this.fileDArianeObj.position.push(this.informationService.getInformation(unix));
            }
        });
     }
    //Est on à la racine du portail?
    isHome() : boolean{
        if(this.fileDArianeObj.position.length>0){
            return false;
        }
        return true;
    }
    //redirection vers l'accueil
    home() : void{
         this.router.navigate(['/']);
    }
    //redirection vers la categorie/information via son index dans fileDArianeObj.position[] : Composite
    selectComposite(index : number) : void{
        //si l'index est déjà la dernière on ne bouge pas (lors d'un click sur le composite séléctionné)
        if(index != this.fileDArianeObj.position.length-1){
            //l'index est donc différent, on met en forme l'url à laquelle naviguer
            let categorie : Categorie;
            let dot = "";
            for(let i = this.fileDArianeObj.position.length-1 ; i >= index ; i--){
                //on retourne un parametre en arrière dans notre route i fois
                dot += "../";
            }
            //redirection
            this.router.navigate([dot,this.fileDAriane[index]], { relativeTo: this.route });
        }
    }
}