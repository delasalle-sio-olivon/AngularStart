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

@Component({
    selector: 'file-d-ariane',
    templateUrl: 'app/view/fileDAriane.component.html',
    providers : [CategorieProvider]
})
export class FileDArianeComponent implements OnInit {
    fileDArianeObj : FileDAriane;

    @Input() fileDAriane : string[];

    constructor(private categorieService : CategorieProvider,private router: Router, private route: ActivatedRoute) { 
        this.fileDArianeObj = new FileDAriane();
    }

    ngOnInit() {
        this.fileDAriane.forEach(unix => {
            this.fileDArianeObj.position.push(this.categorieService.getCategorie(unix));
        });
     }

    isHome() : boolean{
        if(this.fileDArianeObj.position.length>0){
            return false;
        }
        return true;
    }

    selectCategorie(index : number){
        if(index != this.fileDArianeObj.position.length-1 && index != -1){
            
            let categorie : Categorie;
            let dot = "";
            for(let i = this.fileDArianeObj.position.length-1 ; i >= index ; i--){
                dot += "../";
            }
            this.router.navigate([dot,this.fileDAriane[index]], { relativeTo: this.route });
        }else{
            if(index == -1){
                this.fileDArianeObj.clean();
                this.router.navigate(['/'], { relativeTo: this.route });
            }
        }
        /**TODO : Un rechargement de page ? Que faire si on clique sur la cat sur la quelle on est */
    }
}