import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http'

/**
 * Imports de ng2-bootstrap https://valor-software.com/ng2-bootstrap
 */
import { DropdownModule, TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';

import { SelectModule } from 'ng2-select';
/**
 * https://ng-bootstrap.github.io
 */
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
/**
 * Les imports de nos pipes
 */
import { AsColPipe } from '../../pipe/asCol.pipe';

/**
 * Import model
 */
import { Categorie } from '../../model/Categorie';
import { Information } from '../../model/Information';

@NgModule({
    imports: [ CommonModule ],
    exports: [ CommonModule,
               HttpModule,
               JsonpModule,
               AsColPipe,
               SelectModule,
               DropdownModule,
               TypeaheadModule ],
    declarations: [AsColPipe],
})
export class ShareModule { }
