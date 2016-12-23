import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { UtilsProvider } from '../service/utils.provider';
/**
 * La barre du menu
 */
@Component({
    moduleId: module.id,  
    selector: 'barre',
    templateUrl: 'view/barre.component.html',
    styleUrls : ['css/barre.component.css'],
    providers : [UtilsProvider]

})
export class BarreComponent implements OnInit{
    public navIsTop: boolean = true;
    userUnix : String;
    userRealName : String;
    userProjects : any[];
    loginUrl : String;
    registerUrl : String;
    lostPwUrl : String;
    logoutUrl : String;
    accountUrl : String;
    tyforgeUrl : String;
    mediawikiUrl : String;
    hostPortail : String;
    hostTyforge : String;
    HTTP : String;
    constructor(private utilsProvider : UtilsProvider, @Inject(DOCUMENT) private document: Document, private route: ActivatedRoute) { }

    ngOnInit() { 
        //on récupère le pseudo de l'utilisateur (si il n'est pas connecté la valeur sera null)
        this.userUnix = "";
        this.userRealName = "";
        this.userProjects = null;
        this.HTTP = 'http://';

        /*this.utilsProvider.getUserUnixName().subscribe(name=>{
            this.userUnix = name;
            if(this.userIsConnected()){
                this.utilsProvider.getUserRealName(name).subscribe(realName=>{
                    this.userRealName = realName;
                });

                this.utilsProvider.getUserProjects(name).subscribe(projects=>{
                    this.userProjects = projects;
                });
            }
        });*/

        this.hostPortail = window.location.hostname;
        this.hostTyforge = window.location.hostname.replace('portail.', '');
        
        this.loginUrl = this.HTTP + '' + this.hostPortail + '/login/';
        this.registerUrl = this.HTTP + '' + this.hostTyforge + '/account/register.php';
        this.lostPwUrl = this.HTTP + '' + this.hostTyforge + '/account/lostpw.php';
        this.logoutUrl = this.HTTP + '' + this.hostPortail + '/logout' ;
        this.accountUrl = this.HTTP + '' + this.hostTyforge + '/my';
        this.tyforgeUrl = this.HTTP + '' + this.hostTyforge;
        this.mediawikiUrl = this.HTTP + '' + this.hostTyforge + '/plugins/mediawikimen/frame.php?group_id=0';
    }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        let number = this.document.body.scrollTop;
        if (number > 5) {
            this.navIsTop = false;
        } else {
            this.navIsTop = true;
        }
    }

    userIsConnected() : boolean{
        //Si le pseudo est null l'utilisateur n'est pas connecté
        if(this.userUnix === null || this.userUnix === "" || this.userUnix === undefined){
            return false;
        }else{
            return true;
        }
    }

    userHasProjects() : boolean{
        //Si le pseudo est null l'utilisateur n'est pas connecté
        if(!this.userIsConnected){
            return false;
        }
        if(this.userProjects !== null){
            return true;
        }
        return false;
        
    }

    getLoginUrl() : String{
        return window.location.href.replace('#', 'login');
    }

}
