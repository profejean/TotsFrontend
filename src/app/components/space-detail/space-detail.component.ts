import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-space-detail',
  standalone: true,
  templateUrl: './space-detail.component.html',
  styleUrls: ['./space-detail.component.scss'],
  imports: [CommonModule],
})
export class SpaceDetailComponent implements OnInit {
  spaceId!: string;
  space: any;

  // Datos estáticos de ejemplo
  spaces = [
    {
      id: '1',
      name: 'Oficina Central',
      description: 'Oficina ubicada en el corazón del edificio.',
      availability: 'Disponible',
      capacity: '10 personas',
    },
    {
      id: '2',
      name: 'Sala de Reuniones',
      description: 'Espacio equipado para reuniones y presentaciones.',
      availability: 'Ocupado',
      capacity: '20 personas',
    },
    // Añade más espacios según sea necesario
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.spaceId = params.get('id') || '';
      this.space = this.spaces.find((s) => s.id === this.spaceId);
    });
  }

  reserve(): void {
    alert(`Has reservado la ${this.space.name}`);
    // Aquí iría la lógica para reservar el espacio, conectándose al backend
  }
}
