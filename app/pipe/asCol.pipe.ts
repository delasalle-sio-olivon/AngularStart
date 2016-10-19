import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'asCol' })
export class AsColPipe implements PipeTransform {
    transform(value : Array<any>, arg1 : number, arg2 : number ) : Array<any>{
        let returns : Array<any> = new Array<any>();
        for (let i : number = arg2; i < value.length; i++) {
            returns.push(value[i]);
            i=i+arg1-1;
        }
        return returns;
    }
}