import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { NgtCanvas, extend, NgtArgs } from 'angular-three';
import { OrbitControls } from 'three-stdlib';
import { NGT_STORE } from 'angular-three';
import { Desk } from './desk.component';
import { Computer } from './computer.component';

// Extendemos el catálogo de THREE para usar OrbitControls y otros elementos.
extend({ OrbitControls });

@Component({
    standalone: true,
    template: `
        <ngt-ambient-light [intensity]="0.5" />
        <ngt-point-light [position]="[5, 5, 5]" />
        
        <!-- Componentes de oficina -->
        <office-desk></office-desk>
        <office-computer></office-computer>

        <!-- Control de órbita de la cámara -->
        <ngt-orbit-controls *args="[camera, glDom]" [enableDamping]="true" />
    `,
    imports: [Desk, Computer, NgtArgs],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneGraph {
    camera: any;
    glDom: any;

    constructor(@Inject(NGT_STORE) private store: any) {
        this.camera = this.store.get('camera'); // Obtenemos la cámara desde NGT_STORE
        this.glDom = this.store.get('gl', 'domElement'); // Obtenemos el elemento de renderizado
    }
}
