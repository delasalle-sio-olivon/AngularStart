import { Component } from '@angular/core';
/**
 * Providers
 * (Title est le seul service fourni par angular, il permet de modifier le titre de la page)
 */
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'my-app',
    template: '<barre></barre><main></main>',
    viewProviders: [Title]
})
export class AppComponent { 
    constructor(title: Title) {
        title.setTitle('Portail TyForge');
    }
}
