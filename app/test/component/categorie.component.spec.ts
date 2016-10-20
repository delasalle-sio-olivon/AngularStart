/*
import { TestBed } from '@angular/core/testing';

import { PonyComponent } from './pony_cmp';

describe('PonyComponent', () => {
    it('should have an image', () => {
        TestBed.configureTestingModule({
            declarations: [PonyComponent]
        });
       
        const fixture = TestBed.createComponent(PonyComponent);
       
        // given a component instance with a pony input initialized
        const ponyComponent = fixture.componentInstance;
       
        ponyComponent.pony = { name: 'Rainbow Dash', color: 'BLUE' };
        
        // when we trigger the change detection
        fixture.detectChanges();
        // then we should have an image with the correct source attribute
        // depending of the pony color
        const element = fixture.nativeElement;
        expect(element.querySelector('img').getAttribute('src')).toBe('/images/pony-blue.png');
    });
});*/