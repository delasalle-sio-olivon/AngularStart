import { Routes } from '@angular/router';

/**
 * Imports des component
 */
import { MainComponent }  from './component/main.component';

export const ROUTES: Routes = [
    { path: '', component: MainComponent },

    { path: ':categorie1', component: MainComponent },
    { path: ':categorie1/:categorie2', component: MainComponent },
    { path: ':categorie1/:categorie2/:categorie3', component: MainComponent },
    { path: ':categorie1/:categorie2/:categorie3/:categorie4', component: MainComponent },
    { path: ':categorie1/:categorie2/:categorie3/:categorie4/:categorie5', component: MainComponent },
];