import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  PLATFORM_ID,
  TemplateRef,
  input, 
  signal, 
  Signal
} from '@angular/core';
import {
  CommonModule,
  NgTemplateOutlet,
  isPlatformBrowser,
} from '@angular/common';
import { Group, Vector3 } from 'three';
import { injectGLTF } from 'angular-three-soba/loaders';
import { Marker } from '../marker/marker.component';
import { MarkerIcon } from '../marker-icon/marker-icon.component';
import {
  injectBeforeRender,
  NgtArgs,
  NgtEuler,
  NgtHTML,
  NgtVector3,
} from 'angular-three';

@Component({
  selector: 'app-model',
  standalone: true,
  template: `
    <ng-container *ngIf="gltf() as gltf">
      <ngt-group
        [rotation]="[-Math.PI / 2, 0, Math.PI]"
        [position]="position()"
        [dispose]="null"
      >
        <ngt-mesh
          [geometry]="gltf.nodes['URF-Height_Lampd_Ice_0'].geometry"
          [material]="gltf.materials.Lampd_Ice"
        />
        <ngt-mesh
          [geometry]="gltf.nodes['URF-Height_watr_0'].geometry"
          [material]="gltf.materials.watr"
        >
          <ngt-value [rawValue]="0" attach="material.roughness" />
        </ngt-mesh>
        <ngt-mesh
          [geometry]="gltf.nodes['URF-Height_Lampd_0'].geometry"
          [material]="gltf.materials.Lampd"
        >
          <ngt-value [rawValue]="'lightgreen'" attach="material.color" />
          <app-marker [position]="[0, 1.3, 0]" [rotation]="[0, Math.PI / 2, 0]">
            <app-marker-icon color="text-orange-500" />
          </app-marker>
          <ngt-group [position]="[0, 0, 1.3]" [rotation]="[0, 0, Math.PI]">          
            <app-marker [spaceId]="'1'" [position]="[0, 1.3, 0]" [rotation]="[0, Math.PI / 2, 0]">
                <app-marker-icon color="text-orange-500"></app-marker-icon>
            </app-marker>
          </ngt-group>
        </ngt-mesh>
      </ngt-group>
      <ng-container *ngIf="content" [ngTemplateOutlet]="content" />
    </ng-container>
  `,
  styles: [
    `
      /* Puedes añadir estilos específicos para Model aquí si es necesario */
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Marker, MarkerIcon, NgTemplateOutlet, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Model {
  protected Math = Math;
  position = input<NgtVector3>([0, 0, 0]);
  protected content: TemplateRef<any> | null = null;
  protected gltf: Signal<any> = injectGLTF(
    () => process.env['MODEL_URL'] || ''
  ) as Signal<any>;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
      const gltfPath = process.env['MODEL_URL'] || '';
      console.log('Attempting to load GLTF from:', gltfPath);

      injectGLTF.preload(() => gltfPath);

      if (!isPlatformBrowser(this.platformId)) {
          this.gltf = signal(null);
      } else {
          this.gltf = injectGLTF(() => gltfPath) as Signal<any>;
      }
      
      console.log('Model loaded with GLTF:', this.gltf());
  }

  ngOnInit() {
    console.log('Position for Marker 1:', [0, 1.3, 0]);
    console.log('Rotation for Marker 1:', [0, Math.PI / 2, 0]);
    console.log('Position for Marker 2:', [0, 0, 1.3]);
    console.log('Rotation for Marker 2:', [0, 0, Math.PI]);

    fetch('/assets/models/earth.gltf')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('GLTF File fetched successfully:', data);
    })
    .catch(error => {
      console.error('Error fetching GLTF File:', error);
    });
  }
}
