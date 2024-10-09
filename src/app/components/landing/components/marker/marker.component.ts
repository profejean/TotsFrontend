import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  Inject,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { computed, signal, Signal } from '@angular/core';
import { injectBeforeRender, NgtEuler, NgtVector3 } from 'angular-three';
import { Group, Vector3 } from 'three';
import { CommonModule } from '@angular/common';
import { NgtsHTML, NgtsHTMLContent } from 'angular-three-soba/misc';

@Component({
  selector: 'app-marker',
  standalone: true,
  template: `
    <ngt-group #group>
      <ngts-html
        [options]="{
          transform: true,
          occlude: true,
          position: position || [0, 0, 0],
          rotation: rotation || [0, 0, 0]
        }"
      >
        <div
          [ngtsHTMLContent]="{ containerStyle: containerStyle() }"
          (occluded)="isOccluded.set($event)"
          (click)="onClick()"
        >
          <ng-content />
        </div>
      </ngts-html>
    </ngt-group>
  `,
  imports: [NgtsHTML, NgtsHTMLContent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Marker implements OnChanges {
  @Input() spaceId!: string;
  @Input() position: NgtVector3 = [0, 0, 0];
  @Input() rotation: NgtEuler = [0, 0, 0];

  @Output() markerClick = new EventEmitter<string>();

  @ViewChild('group', { static: true }) private groupRef!: ElementRef<Group>;

  // Definición de señales y propiedades computadas
  protected isOccluded = signal(false);
  private isInRange = signal(false);

  // Configuración de estilos basada en el estado de visibilidad
  protected containerStyle = computed(() => ({
    transition: 'all 0.2s',
    opacity: this.isOccluded() ? '0' : '1',
    transform: `scale(${this.isOccluded() ? 0.25 : 1})`,
  }));

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    console.log('Marker component constructor with spaceId:', this.spaceId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['spaceId']) {
      console.log('spaceId updated in ngOnChanges:', changes['spaceId'].currentValue);
    }
    console.log('Marker ngOnChanges with updated inputs:', {
      spaceId: this.spaceId,
      position: this.position,
      rotation: this.rotation
    });
  }

  ngAfterViewInit() {
    console.log('Marker ngAfterViewInit for spaceId:', this.spaceId);
  }

  onClick() {
    console.log(`Marker with ID ${this.spaceId} clicked`);
    this.markerClick.emit(this.spaceId);
  }
}
