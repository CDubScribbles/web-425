import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Taco {
  id: number;
  name: string;
  price: number;
  noOnions?: boolean;
  noCilantro?: boolean;
  quantity?: number;
}

export interface Order {
  tacos: Taco[];
  orderId: number;
}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <section>
      <p class="w4-eyebrow">Made to order</p>
      <h1>Place Your Order</h1>

      <form
        class="w4-panel w4-form"
        #tacoOrderForm="ngForm"
        (ngSubmit)="addToOrder()"
      >
        <fieldset>
          <legend>My Order</legend>

          <div class="w4-field">
            <label for="tacoType">Taco Type</label>
            <select
              id="tacoType"
              name="tacoType"
              [(ngModel)]="selectedTacoId"
            >
              @for (taco of tacos; track taco.id) {
                <option [value]="taco.id">
                  {{ taco.name }} — {{ taco.price | currency }}
                </option>
              }
            </select>
          </div>

          <div class="w4-field w4-field-compact">
            <label for="qty">Quantity</label>
            <input
              id="qty"
              name="qty"
              type="number"
              min="1"
              inputmode="numeric"
              [(ngModel)]="quantity"
            />
          </div>

          <label class="w4-choice-card" for="noOnions">
            <input
              id="noOnions"
              name="noOnions"
              type="checkbox"
              [(ngModel)]="noOnions"
            />
            <span><strong>No Onions</strong></span>
          </label>

          <label class="w4-choice-card" for="noCilantro">
            <input
              id="noCilantro"
              name="noCilantro"
              type="checkbox"
              [(ngModel)]="noCilantro"
            />
            <span><strong>No Cilantro</strong></span>
          </label>

          <input
            class="w4-btn w4-btn-primary w4-btn-block"
            type="submit"
            value="Add to Order"
          />
        </fieldset>
      </form>

      @if (order.tacos.length > 0) {
        <ul class="w4-summary-list">
          @for (taco of order.tacos; track $index) {
            <li>
              <strong>{{ taco.quantity }}x {{ taco.name }}</strong>
              <p>
                Price per taco:
                {{ taco.price | currency:'USD':'symbol':'1.2-2' }}
              </p>
              @if (taco.noOnions) {
                <p>No onions</p>
              }
              @if (taco.noCilantro) {
                <p>No cilantro</p>
              }
            </li>
          }
        </ul>
        <p>
          <strong>Total:</strong>
          {{ getTotal() | currency:'USD':'symbol':'1.2-2' }}
        </p>
      } @else {
        <p>No tacos added to the order yet.</p>
      }
    </section>
  `
})
export class OrderComponent {
  tacos: Taco[];
  order: Order;
  selectedTacoId: number;
  quantity: number;
  noOnions = false;
  noCilantro = false;

  constructor() {
    this.tacos = [
      { id: 1, name: 'Carnitas Taco', price: 3.25 },
      { id: 2, name: 'Queso Birria Taco', price: 3.50 },
      { id: 3, name: 'Al Pastor Taco', price: 3.25 },
      { id: 4, name: 'Baja Fish Taco', price: 3.75 },
      { id: 5, name: 'Barbacoa Taco', price: 3.50 },
      { id: 6, name: 'Grilled Veggie Taco', price: 3.00 },
      { id: 7, name: 'Shrimp Taco', price: 4.00 },
      { id: 8, name: 'Chorizo Taco', price: 3.25 },
      { id: 9, name: 'Pollo Asado Taco', price: 3.25 },
      { id: 10, name: 'Nopales Taco', price: 3.00 }
    ];
    this.order = { tacos: [], orderId: 0 };
    this.selectedTacoId = this.tacos[0].id;
    this.quantity = 1;
  }

  addToOrder(): void {
    const selectedTacoId = Number(this.selectedTacoId);
    const selectedTaco = this.tacos.find(
      taco => taco.id === selectedTacoId
    );

    this.order.orderId = Math.floor(Math.random() * 1000) + 1;

    if (selectedTaco !== undefined) {
      const tacoToAdd: Taco = {
        id: selectedTaco.id,
        name: selectedTaco.name,
        price: selectedTaco.price,
        noOnions: this.noOnions,
        noCilantro: this.noCilantro,
        quantity: this.quantity
      };
      this.order.tacos.push(tacoToAdd);
      this.resetForm();
    } else {
      console.error('Taco not found.', this.selectedTacoId);
    }
  }

  getTotal(): number {
    return this.order.tacos.reduce(
      (total, taco) => total + taco.price * (taco.quantity ?? 1),
      0
    );
  }

  resetForm(): void {
    if (this.tacos.length > 0) {
      this.selectedTacoId = this.tacos[0].id;
    }
    this.quantity = 1;
    this.noOnions = false;
    this.noCilantro = false;
  }
}
