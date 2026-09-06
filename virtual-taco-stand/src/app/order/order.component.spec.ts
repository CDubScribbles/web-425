import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate an order ID between 1 and 1000', () => {
    component.addToOrder();

    expect(component.order.orderId).toBeGreaterThanOrEqual(1);
    expect(component.order.orderId).toBeLessThanOrEqual(1000);
  });

  it('should add a selected taco with correct customization', () => {
    component.selectedTacoId = 1;
    component.quantity = 2;
    component.noOnions = true;
    component.noCilantro = false;

    component.addToOrder();

    const addedTaco = component.order.tacos[0];
    expect(addedTaco.id).toBe(1);
    expect(addedTaco.quantity).toBe(2);
    expect(addedTaco.noOnions).toBe(true);
    expect(addedTaco.noCilantro).toBe(false);
  });

  it('should calculate the total for multiple order entries', () => {
    component.selectedTacoId = 1;
    component.quantity = 2;
    component.addToOrder();

    component.selectedTacoId = 2;
    component.quantity = 1;
    component.addToOrder();

    expect(component.getTotal()).toBeCloseTo(3.25 * 2 + 3.50 * 1);
  });

  it('should reset every form field to its default value after submission', () => {
    component.selectedTacoId = 2;
    component.quantity = 3;
    component.noOnions = true;
    component.noCilantro = true;

    component.addToOrder();

    expect(component.quantity).toBe(1);
    expect(component.noOnions).toBe(false);
    expect(component.noCilantro).toBe(false);
  });
});
