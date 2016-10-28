import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * Le boot s'éffectu ici
 */
@Component({
    moduleId: module.id,  
    selector: 'router',
    template: '<barre></barre><router-outlet></router-outlet>',
    viewProviders: [Title],

})
export class RouterComponent implements OnInit {
    constructor(title: Title) {
        title.setTitle('Portail TyForge');
    }

    ngOnInit() { }

}