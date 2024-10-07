import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { extend } from 'angular-three';
import * as THREE from 'three';

extend(THREE);

@Component({
    selector: 'office-desk',
    standalone: true,
    template: `
        <ngt-mesh [position]="[0, -1, 0]" (pointerover)="hovered = true" (pointerout)="hovered = false">
            <ngt-box-geometry [args]="[3, 0.2, 1.5]" /> <!-- Mesa rectangular -->
            <ngt-mesh-standard-material [color]="hovered ? 'brown' : 'saddlebrown'" />
        </ngt-mesh>
    `,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Desk {
    hovered = false;
}
