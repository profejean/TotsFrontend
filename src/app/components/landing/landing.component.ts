import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtCanvas, extend } from 'angular-three';
import * as THREE from 'three';

extend(THREE);

@Component({
  standalone: true,
  template: ` <ngt-mesh></ngt-mesh> `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneGraph {}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<ngt-canvas [sceneGraph]="SceneGraph" />`,
  imports: [NgtCanvas],
})
export class LandingComponent {
  readonly SceneGraph = SceneGraph;
}
