import { Injectable } from '@angular/core';
import { ServiceProvider } from './service.provider';
import { Observable }     from 'rxjs/Observable';

//fourni les Information
@Injectable()
export class UtilsProvider {
    constructor(private service : ServiceProvider) { 

    }

    getUserUnixName() : Observable<String>{
        return this.service.getUserUnixName();
    }

    getUserRealName(unix : String) : Observable<String>{
        return this.service.getUserRealName(unix);
    }

    getUserProjects(unix : String) : Observable<any>{
        return this.service.getUserProjects(unix);
    }

}
