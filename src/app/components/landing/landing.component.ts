import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import { NgtCanvas } from 'angular-three';
import { Experience } from './components/experience/experience.component';
import { CommonModule } from '@angular/common';
import { injectGLTF } from 'angular-three-soba/loaders';

@Component({
  selector: 'app-landing',
  standalone: true,
  template: `
    <ngt-canvas
      [sceneGraph]="sceneGraph"
      [camera]="{ position: [15, 1.5, 15], fov: 10 }"
      class="full-screen-canvas"
    ></ngt-canvas>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        overflow: hidden;
        box-sizing: border-box;
      }

      .full-screen-canvas {
        width: 100% !important;
        height: 100% !important;
        display: block !important;
      }

      ngt-canvas,
      canvas {
        display: block;
        box-sizing: border-box;
      }

      /* Asegura que html, body, y app-root ocupen todo el viewport */
      html,
      body,
      app-root {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
      }

      /* Añade box-sizing global */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
    `,
  ],
  imports: [NgtCanvas, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent implements OnInit {
  readonly sceneGraph = Experience;

  ngOnInit(): void {
    // Preload the GLTF model before rendering the scene
    injectGLTF.preload(
      () => process.env['MODEL_URL'] || '/assets/models/default.gltf'
    );
  }
}
