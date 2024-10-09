import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgtColor, NgtAmbientLight } from 'angular-three';
import {
  NgtsContactShadows,
  NgtsEnvironment,
} from 'angular-three-soba/staging';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { Model } from '../model/model.component';
import { Marker } from '../marker/marker.component';
import { MarkerIcon } from '../marker-icon/marker-icon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lowpoly-earth-experience',
  standalone: true,
  template: `
    <ngt-color *args="['#ececec']" attach="background" />
    <ngt-ambient-light [intensity]="0.5" />
    <app-model [position]="[0, 0.25, 0]">
      <ngts-contact-shadows
        [options]="{
          frames: 1,
          scale: 5,
          position: [0, -1, 0],
          far: 1,
          blur: 5,
          color: '#204080'
        }"
      />
    </app-model>
    <ngts-environment [options]="{ preset: 'city' }" />
    <ngts-orbit-controls [options]="{ autoRotate: true }" />
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Model,
    NgtsEnvironment,
    NgtsContactShadows,
    NgtsOrbitControls,
    CommonModule,
    Marker,
    MarkerIcon,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Experience {
  constructor(private router: Router) {}

  // Lista de espacios con datos estáticos
  spaces = [
    {
      id: '1',
      name: 'Oficina Central',
      position: [0, 1.3, 0],
      rotation: [0, Math.PI / 2, 0],
      color: 'text-orange-500',
    },
    {
      id: '2',
      name: 'Sala de Reuniones',
      position: [0, 0, 1.3],
      rotation: [0, Math.PI / 2, Math.PI / 2],
      color: 'text-red-500',
    },
  ];

  onMarkerClick(spaceId: string): void {
    this.router.navigate(['/space', spaceId]);
  }
}
