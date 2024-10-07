import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { extend } from 'angular-three';
import * as THREE from 'three';

extend(THREE);

@Component({
    selector: 'office-computer',
    standalone: true,
    template: `
        <ngt-mesh [position]="[0, 0, 0.75]" (click)="screenOn = !screenOn">
            <ngt-box-geometry [args]="[0.6, 0.4, 0.05]" /> <!-- Pantalla -->
            <ngt-mesh-standard-material [color]="screenOn ? 'blue' : 'black'" />
        </ngt-mesh>
    `,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Computer {
    screenOn = false; // Estado para simular que la computadora está encendida o apagada
}
