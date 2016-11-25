import { NgModule } from '@angular/core';

/**
 * Component
 */
import { AdminComponent }  from './component/admin.component';
import { TreeComponent }  from './component/tree.component';
import { CategorieEditorComponent }  from './component/categorieeditor.component';
import { ParentCatEditorComponent }  from './component/parentcateditor.component';
import { InformationEditorComponent }  from './component/informationeditor.component';
import { ParentInfoEditorComponent }  from './component/parentinfoeditor.component';

/**
 * Module
 */
import { ShareModule } from '../share/share.module';

/**
 * Service
 */
import { SauvegardeService } from './service/sauvegarde.provider';
import { CategorieProvider } from '../../service/categorie.provider';
import { InformationProvider } from '../../service/information.provider';
import { ServiceProvider } from '../../service/service.provider';

@NgModule({
    imports: [ ShareModule ],
    exports: [AdminComponent],
    declarations: [AdminComponent,
                  TreeComponent,
                  CategorieEditorComponent,
                  ParentCatEditorComponent,
                  InformationEditorComponent,
                  ParentInfoEditorComponent],
    providers: [SauvegardeService, CategorieProvider, InformationProvider, ServiceProvider],
})
export class AdminModule { }
