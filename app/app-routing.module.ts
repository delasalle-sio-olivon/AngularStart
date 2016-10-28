import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
/**
 * Component imports
 */
import { MainComponent }  from './component/main.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
        { path: '', component: MainComponent },
        { path: ':categorie1/:categorie2/:categorie3/:categorie4/:categorie5', component: MainComponent },
        { path: ':categorie1/:categorie2/:categorie3/:categorie4', component: MainComponent },
        { path: ':categorie1/:categorie2/:categorie3', component: MainComponent },
        { path: ':categorie1/:categorie2', component: MainComponent },
        { path: ':categorie1', component: MainComponent }        
    ], { useHash : true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
