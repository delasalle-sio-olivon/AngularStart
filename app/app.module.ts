/**
 * Import angular
 *  */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';//pour navigateur
import { HttpModule } from '@angular/http'
import { AppRoutingModule } from './app-routing.module';
/**
 * Les imports de nos components
 */
import { AppComponent }  from './component/app.component';
import { MainComponent }  from './component/main.component';
import { BarreComponent }  from './component/barre.component';
import { CategorieComponent }  from './component/categorie.component';
import { FileDArianeComponent }  from './component/fileDAriane.component';
import { RouterComponent }  from './component/router.component';



/**
 * Les imports de nos pipes
 */
import { AsColPipe } from './pipe/asCol.pipe';



@NgModule({
  imports: [ BrowserModule,
             HttpModule,
             AppRoutingModule],
  declarations: [ AppComponent,
                  MainComponent,
                  BarreComponent,
                  AsColPipe,
                  CategorieComponent,
                  FileDArianeComponent,
                  RouterComponent ],
  bootstrap: [ RouterComponent ]
})
export class AppModule { }
