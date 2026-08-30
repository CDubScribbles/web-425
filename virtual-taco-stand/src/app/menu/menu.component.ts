import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface MenuItem {
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <p class="w4-eyebrow">Made fresh to order</p>
      <h1>Our Menu</h1>
      <p class="w4-page-intro">
        Explore our selection of handcrafted tacos, each filled with fresh
        ingredients and vibrant flavors to satisfy your cravings.
      </p>
      <ul class="w4-grid w4-grid-3">
        @for (item of menu; track item.name; let i = $index) {
          <li class="menu-item">
            <article class="w4-card w4-card-tall">
              <div class="w4-card-header">
                <span class="w4-kicker">{{ (i + 1).toString().padStart(2, '0') }}</span>
                <span class="w4-badge">{{ item.price | currency }}</span>
              </div>
              <h3>{{ item.name }}</h3>
              <p class="w4-card-text">{{ item.description }}</p>
            </article>
          </li>
        }
      </ul>
    </section>
  `
})
export class MenuComponent {
  readonly menu: MenuItem[] = [
    { name: 'Carnitas Taco', description: 'Slow-cooked pork with cilantro, onions, and salsa.', price: 3.25 },
    { name: 'Queso Birria Taco', description: 'Cheesy birria with cilantro, onions, and consomé.', price: 3.50 },
    { name: 'Al Pastor Taco', description: 'Marinated pork with pineapple, cilantro, and onions.', price: 3.25 },
    { name: 'Baja Fish Taco', description: 'Crispy battered fish with slaw and chipotle crema.', price: 3.75 },
    { name: 'Barbacoa Taco', description: 'Slow-braised beef cheek with onions and cilantro.', price: 3.50 },
    { name: 'Grilled Veggie Taco', description: 'Charred peppers, zucchini, and onion with cotija.', price: 3.00 },
    { name: 'Shrimp Taco', description: 'Chili-lime shrimp with cabbage slaw and avocado crema.', price: 4.00 },
    { name: 'Chorizo Taco', description: 'Spiced Mexican sausage with potatoes and salsa verde.', price: 3.25 },
    { name: 'Pollo Asado Taco', description: 'Citrus-marinated grilled chicken with pico de gallo.', price: 3.25 },
    { name: 'Nopales Taco', description: 'Grilled cactus with black beans, queso fresco, and salsa.', price: 3.00 }
  ];
}
