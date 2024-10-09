import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgtsContactShadows,
  NgtsEnvironment,
} from 'angular-three-soba/staging';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { Model } from '../model/model.component';
import { Marker } from '../marker/marker.component';
import { MarkerIcon } from '../marker-icon/marker-icon.component';
import { Router } from '@angular/router';
import { NgtVector3, NgtEuler } from 'angular-three';

@Component({
  selector: 'app-lowpoly-earth-experience',
  standalone: true,
  template: `
    <ngt-color [args]="['#ececec']" attach="background"></ngt-color>
    <ngt-ambient-light [intensity]="0.5"></ngt-ambient-light>
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
      ></ngts-contact-shadows>

      <!-- Agregamos verificación aquí -->
      <ng-container *ngIf="spaces && spaces.length">
        <ng-container *ngFor="let space of spaces">
          <app-marker
            *ngIf="space.id && space.position && space.rotation"
            [spaceId]="space.id"
            [position]="space.position"
            [rotation]="space.rotation"
            (markerClick)="onMarkerClick(space.id)"
          >
            <app-marker-icon
              [color]="space.color"
              [withText]="true"
              [label]="space.name"
            ></app-marker-icon>
          </app-marker>
        </ng-container>
      </ng-container>
    </app-model>
    <ngts-environment [options]="{ preset: 'city' }"></ngts-environment>
    <ngts-orbit-controls [options]="{ autoRotate: true }"></ngts-orbit-controls>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NgtsEnvironment,
    NgtsContactShadows,
    NgtsOrbitControls,
    Model,
    Marker,
    MarkerIcon,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Experience {
  spaces: {
    id: string;
    name: string;
    position: NgtVector3;
    rotation: NgtEuler;
    color: string;
  }[] = [
    {
      id: '1',
      name: 'Oficina Central',
      position: [0, 1.3, 0] as NgtVector3,
      rotation: [0, Math.PI / 2, 0] as NgtEuler,
      color: 'text-orange-500',
    },
    {
      id: '2',
      name: 'Sala de Reuniones',
      position: [0, 0, 1.3] as NgtVector3,
      rotation: [0, Math.PI / 2, 0] as NgtEuler,
      color: 'text-red-500',
    },
  ];

  constructor(private router: Router) {
    console.log('Experience component initialized');
    console.log('Spaces array:', this.spaces);
  }

  onMarkerClick(spaceId: string): void {
    console.log(`Navigating to space with ID: ${spaceId}`);
    this.router.navigate(['/space', spaceId]);
  }
}
