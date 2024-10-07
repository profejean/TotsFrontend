import { Component } from '@angular/core';
import { NgtCanvas } from 'angular-three';
import { SceneGraph } from '../scene/scene.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgtCanvas, SceneGraph],
  template: `
    <div class="relative min-h-screen">
      <!-- Canvas de Three.js -->
      <ngt-canvas [sceneGraph]="SceneGraph" class="absolute inset-0 z-0"></ngt-canvas>

      <!-- Mensaje de bienvenida centrado -->
      <div class="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white space-y-4">
        <h1 class="text-5xl font-bold">Encuentra tu Espacio Perfecto</h1>
        <p class="text-lg">Reserva fácilmente el espacio ideal para tus eventos y reuniones</p>
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg">
          Explorar Espacios
        </button>
      </div>    
    </div>

    <!-- Panel de filtros -->
    <div class="bg-gray-100 py-6 px-4 md:px-8 lg:px-16">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Filtra los Espacios Disponibles</h2>
      <div class="flex flex-wrap gap-4">
        <input type="text" placeholder="Buscar por tipo de espacio" class="p-3 border border-gray-300 rounded-md w-full md:w-1/4">
        <input type="number" placeholder="Capacidad" class="p-3 border border-gray-300 rounded-md w-full md:w-1/4">
        <input type="date" placeholder="Fecha" class="p-3 border border-gray-300 rounded-md w-full md:w-1/4">
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md w-full md:w-auto">
          Aplicar Filtros
        </button>
      </div>
    </div>

    <!-- Listado de Espacios -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-8 lg:p-16 bg-white">
      <!-- Tarjeta de Espacio -->
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?fit=crop&w=500&q=80" alt="Espacio" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-xl font-bold text-gray-800">Sala de Conferencias</h3>
          <p class="text-gray-600 mt-2">Espacio ideal para reuniones de negocios y presentaciones.</p>
          <div class="flex items-center justify-between mt-4">
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Ver Detalles</button>
            <button class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
              Reservar
            </button>
          </div>
        </div>
      </div>
      <!-- Duplicar esta tarjeta para más espacios -->
    </div>
  `,
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  readonly SceneGraph = SceneGraph;
}
