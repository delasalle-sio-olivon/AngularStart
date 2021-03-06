/**
 * Import angular
 *  */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';//pour navigateur
import { HttpModule, JsonpModule } from '@angular/http'
import { AppRoutingModule } from './app-routing.module';
/**
 * Les imports de nos components
 */
import { MainComponent }  from './component/main.component';
import { BarreComponent }  from './component/barre.component';
import { CategorieComponent }  from './component/categorie.component';
import { InformationComponent }  from './component/information.component';
import { FileDArianeComponent }  from './component/fileDAriane.component';
import { RouterComponent }  from './component/router.component';
import { SearchComponent }  from './component/search.component';


/**
 * Imports de ng2-bootstrap https://valor-software.com/ng2-bootstrap
 */
import { DropdownModule, TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
/**
 * https://ng-bootstrap.github.io
 */
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
/**
 * Les imports de nos pipes
 */
import { AsColPipe } from './pipe/asCol.pipe';



@NgModule({
  imports: [ BrowserModule,
             HttpModule,
             JsonpModule,
             AppRoutingModule,
             DropdownModule,
             TypeaheadModule ],
  declarations: [ MainComponent,
                  BarreComponent,
                  AsColPipe,
                  CategorieComponent,
                  InformationComponent,
                  FileDArianeComponent,
                  RouterComponent,
                  SearchComponent ],
  bootstrap: [ RouterComponent ]
})
export class AppModule { }
