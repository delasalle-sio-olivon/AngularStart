//c'est un module donc on import ça
import { NgModule }      from '@angular/core';

//on lance une app web donc on import ça
import { BrowserModule } from '@angular/platform-browser';


/**
 * Les imports de nos component
 */
import { AppComponent }  from './component/app.component';
import { MainComponent }  from './component/main.component';
import { BarreComponent }  from './component/barre.component';


@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent,
                  MainComponent,
                  BarreComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
