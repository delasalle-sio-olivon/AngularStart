import { Component, OnInit } from '@angular/core';
/**
 * Le boot s'éffectu ici
 */
@Component({
    selector: 'router',
    template: '<barre></barre><router-outlet></router-outlet>'
})
export class RouterComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}