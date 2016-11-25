/**
 * Composite class abstraite
 */
export class Composite{
    id : number;
    unix : string;
    titre : string;
    resume : string;
    detail : string;


    constructor(){

    }

    static filterById(element : Composite[], id : number) {
        return element.filter(el=>{
            if(el.id === id){
                return true;
            }
            return false;
        });
    }

    static filterLessThanId(element : Composite[], id : number) {
        return element.filter(el=>{
            if(el.id < id){
                return true;
            }
            return false;
        });
    }

    static filterMoreThanId(element : Composite[], id : number) {
        return element.filter(el=>{
            if(el.id > id){
                return true;
            }
            return false;
        });
    }
}