import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrutasService, Fruta } from '../services/frutas.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="carrito-container">
      <h2 style="color:rgb(218, 102, 121); font-variant: small-caps; font-size:40px;">Tu Carrito</h2>
      @if (carrito.length === 0) {
        <p style="color:grey;">Aún no has añadido productos a tu carrito!</p>
      } @else {
        <div class="carrito-items">
          @for (fruta of carrito; track fruta.id) {
            <div class="carrito-item">
              <span>{{ fruta.nombre }}</span>
              <span style="color: rgb(182, 69, 88);">{{ fruta.precio | currency:'EUR' }}</span>
            </div>
          }
        </div>
        <div class="total">
          <h3>Total: {{ total | currency:'EUR' }}</h3>
        </div>
      }
    </div>
  `,
  styles: [`
    .carrito-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .carrito-items {
      margin-top: 20px;
    }
    .carrito-item {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    .total {
      margin-top: 20px;
      text-align: right;
    }
  `]
})
export class CarritoComponent implements OnInit {
  carrito: Fruta[] = [];

  constructor(private frutasService: FrutasService) {}

  ngOnInit() {
    this.frutasService.getCarrito().subscribe(
      carrito => this.carrito = carrito
    );
  }

  get total() {
    return this.carrito.reduce((sum, item) => sum + item.precio, 0);
  }
}
