import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgtHTML } from 'angular-three';

@Component({
  selector: 'app-marker-icon',
  standalone: true,
  template: `
    <div
      *ngIf="withText"
      style="position: absolute; font-size: 1.2rem; letter-spacing: -0.5px; left: 20px; text-rendering: optimizeLegibility;"
    >
      {{ label }}
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="size-5"
      [class]="color"
    >
      <path
        fill-rule="evenodd"
        d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
        clip-rule="evenodd"
      />
    </svg>
  `,

  styles: [
    `
      svg {
        cursor: pointer;
        transition: transform 0.2s;
      }

      svg:hover {
        transform: scale(1.2);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MarkerIcon extends NgtHTML {
  @Input() color: string = 'text-orange-500';
  @Input() withText: boolean = false;
  @Input() label: string = 'Espacio';

  constructor() {
    super();
    console.log(
      'MarkerIcon initialized with color:',
      this.color,
      'and withText:',
      this.withText
    );
  }

  ngOnInit() {
    console.log('MarkerIcon created with label:', this.label);
  }
}
