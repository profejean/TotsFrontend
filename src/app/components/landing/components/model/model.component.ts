import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  PLATFORM_ID,
  TemplateRef,
} from '@angular/core';
import {
  CommonModule,
  NgTemplateOutlet,
  isPlatformBrowser,
} from '@angular/common';
import { Group, Vector3 } from 'three';
import { injectGLTF } from 'angular-three-soba/loaders';
import { input, signal, Signal } from '@angular/core';
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
            <app-marker [rotation]="[0, Math.PI / 2, Math.PI / 2]">
              <app-marker-icon color="text-red-500" [withText]="true" />
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
    if (!isPlatformBrowser(this.platformId)) {
      this.gltf = signal(null);
    }
  }
}
