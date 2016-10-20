import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
/**
 * Component imports
 */
import { RouterComponent }  from './component/router.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
        { path: '', component: RouterComponent },
        { path: ':categorie1', component: RouterComponent },
        { path: ':categorie1/:categorie2', component: RouterComponent },
        { path: ':categorie1/:categorie2/:categorie3', component: RouterComponent },
        { path: ':categorie1/:categorie2/:categorie3/:categorie4', component: RouterComponent },
        { path: ':categorie1/:categorie2/:categorie3/:categorie4/:categorie5', component: RouterComponent },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
