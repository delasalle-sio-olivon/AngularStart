export class Utils {
    
    constructor() { }

    static replaceSpaceByUnderscore(txt : string) : string {
        txt = txt.trim();
        return txt.split(' ').join('_');
    }
}