import { FileDAriane } from '../../model/FileDAriane';

import { TestBed }      from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
 
describe('Model FileDAriane', () => {
    let fileDAriane : FileDAriane;
 
    beforeEach(() => {
        fileDAriane = new FileDAriane();
    });
 
    it('True doit être true', () => {
        expect(true).toBe(true);
    });
});