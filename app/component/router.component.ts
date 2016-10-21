import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'router',
    template: '<barre></barre><router-outlet></router-outlet>'
})
export class RouterComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}