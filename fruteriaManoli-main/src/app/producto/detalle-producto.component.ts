import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FrutasService, Fruta } from '../services/frutas.service';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (fruta) {
      <div class="detalle-container">
        <h2 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">{{ fruta.nombre }}</h2>
        <p>Precio: {{ fruta.precio | currency:'EUR' }}</p>
        <button (click)="agregarAlCarrito()" class="agregar-btn">
          Agregar al carrito
        </button>
        <button (click)="toggleFavorito()" class="favorito-btn">
          {{ fruta.favorita ? '❤️' : '🤍' }}
        </button>
      </div>
    } @else {
      <p style="font-variant: small-caps; color: rgb(182, 69, 88); font-size: 40px; text-align:center;">Página No encontrada ERROR 404</p>
    }
  `,
  styles: [`
    .detalle-container {

      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .agregar-btn {
      padding: 8px 16px;
      background-color:rgb(182, 69, 88);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px;
    }
    .favorito-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
  `]
})
export class DetalleProductoComponent implements OnInit {
  fruta?: Fruta;

  constructor(
    private route: ActivatedRoute,
    private frutasService: FrutasService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fruta = this.frutasService.getFrutaById(id);
  }

  toggleFavorito() {
    if (this.fruta) {
      this.frutasService.toggleFavorito(this.fruta.id);
    }
  }

  agregarAlCarrito() {
    if (this.fruta) {
      this.frutasService.agregarAlCarrito(this.fruta);
    }
  }
}
