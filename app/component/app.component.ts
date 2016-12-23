import { Component, OnInit } from '@angular/core';

/**
 * Import providers
 */
import { CategorieProvider } from '../service/categorie.provider';
import { InformationProvider } from '../service/information.provider';
import { ServiceProvider } from '../service/service.provider';
import { UtilsProvider } from '../service/utils.provider';
import { Title } from '@angular/platform-browser';
/**
 * Le boot s'éffectu ici
 */
@Component({
    moduleId: module.id,  
    selector: 'app',
    //router-outlet est le "Component" qui contient le Component rendu par le module de routing
    template: '<barre></barre><router-outlet></router-outlet><pied-de-page></pied-de-page>',
    viewProviders: [Title],
    providers : [CategorieProvider, InformationProvider, ServiceProvider, UtilsProvider]

})
export class AppComponent implements OnInit {
    constructor(title: Title) {
        title.setTitle('Portail TyForge');
    }

    ngOnInit() { }

}