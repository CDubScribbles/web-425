import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Order } from '../order/order.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="w4-sr-only">Order Summary</h1>
    @if (order.tacos.length > 0) {
      <ul class="w4-summary-list">
        @for (taco of order.tacos; track $index; let i = $index) {
          <li>
            <div class="w4-item-heading">
              <strong>Item {{ i + 1 }}: {{ taco.name }}</strong>
            </div>
            <div class="w4-detail-list">
              <p>Quantity: <span>{{ taco.quantity }}</span></p>
              <p>Unit price: <span>{{ taco.price | currency:'USD':'symbol':'1.2-2' }}</span></p>
              <p>
                Subtotal:
                <span>{{ (taco.price * (taco.quantity ?? 1)) | currency:'USD':'symbol':'1.2-2' }}</span>
              </p>
              @if (taco.noOnions) {
                <p>No onions</p>
              }
              @if (taco.noCilantro) {
                <p>No cilantro</p>
              }
            </div>
            <button
              type="button"
              class="w4-btn w4-btn-secondary"
              (click)="removeTaco.emit(i)"
            >
              Remove Taco
            </button>
          </li>
        }
      </ul>
      <div class="w4-summary-total">
        <span>Total:</span>
        <strong>{{ getTotal() | currency:'USD':'symbol':'1.2-2' }}</strong>
      </div>
    } @else {
      <div class="w4-empty-state">
        <p>No tacos added to the order yet.</p>
      </div>
    }
  `
})
export class OrderSummaryComponent {
  private readonly orderState = signal<Order>({
    orderId: 0,
    tacos: []
  });

  @Input()
  set order(value: Order) {
    this.orderState.set(value);
  }

  get order(): Order {
    return this.orderState();
  }

  @Output() removeTaco = new EventEmitter<number>();

  getTotal(): number {
    return this.order.tacos.reduce(
      (total, taco) => total + taco.price * (taco.quantity ?? 1),
      0
    );
  }
}
