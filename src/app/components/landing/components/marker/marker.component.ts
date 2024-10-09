import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  Inject,
  Output,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { computed, Input, input, signal, Signal } from '@angular/core';
import { injectBeforeRender, NgtEuler, NgtVector3 } from 'angular-three';
import { Group, Vector3 } from 'three';
import { CommonModule } from '@angular/common';
import { NgtsHTML, NgtsHTMLContent } from 'angular-three-soba/misc';
import { NgtArgs } from 'angular-three';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marker',
  standalone: true,
  template: `
    <ngt-group #group>
      <ngts-html
        [options]="{
          transform: true,
          occlude: true,
          position: position(),
          rotation: rotation()
        }"
      >
        <div
          [ngtsHTMLContent]="{ containerStyle: containerStyle() }"
          (occluded)="isOccluded.set($event)"
        >
          <ng-content />
        </div>
      </ngts-html>
    </ngt-group>
  `,
  styles: [
    `
      /* Puedes añadir estilos específicos para Marker aquí si es necesario */
    `,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgtsHTML, NgtsHTMLContent, CommonModule],
})
export class Marker {
  @Input() spaceId!: string;
  position = input<NgtVector3>([0, 0, 0]);
  rotation = input<NgtEuler>([0, 0, 0]);

  @Output() markerClick = new EventEmitter<string>();

  @ViewChild('group', { static: true }) private groupRef!: ElementRef<Group>;

  protected isOccluded = signal(false);
  private isInRange = signal(false);

  private isVisible = computed(() => !this.isOccluded() && this.isInRange());
  protected containerStyle = computed(() => ({
    transition: 'all 0.2s',
    opacity: this.isVisible() ? '1' : '0',
    transform: `scale(${this.isVisible() ? 1 : 0.25})`,
  }));

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    const v = new Vector3();
    injectBeforeRender(({ camera }) => {
      const worldPosition = new Vector3();
      this.groupRef.nativeElement.getWorldPosition(worldPosition);
      const range = camera.position.distanceTo(worldPosition) <= 10;
      if (range !== this.isInRange()) this.isInRange.set(range);
    });
  }
}
