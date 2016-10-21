import { Component } from '@angular/core';
/**
 * Providers
 * (Title est le seul service fourni par angular, il permet de modifier le titre de la page)
 */
import { Title } from '@angular/platform-browser';
import { ServiceProvider } from '../service/service.provider';


@Component({
    selector: 'my-app',
    template: '<main></main>',
    viewProviders: [Title],
    providers : [ServiceProvider]
})
export class AppComponent { 
    constructor(title: Title) {
        title.setTitle('Portail TyForge');
    }
}
