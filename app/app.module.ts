//c'est un module donc on import ça
import { NgModule }      from '@angular/core';

//on impote les modules que l'on veut
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

/**
 * Les imports de nos components
 */
import { AppComponent }  from './component/app.component';
import { MainComponent }  from './component/main.component';
import { BarreComponent }  from './component/barre.component';
import { CategorieComponent }  from './component/categorie.component';

/**
 * Les imports de nos pipes
 */
import { AsColPipe } from './pipe/asCol.pipe';



@NgModule({
  imports: [ BrowserModule ,
             HttpModule],
  declarations: [ AppComponent,
                  MainComponent,
                  BarreComponent,
                  AsColPipe,
                  CategorieComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
