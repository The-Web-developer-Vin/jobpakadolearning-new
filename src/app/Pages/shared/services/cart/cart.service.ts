import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  items:any = [];

  addToCart(addedItem:any) {
    this.items.push(addedItem);
    this.saveCart();
  }
  getItems() {
    return this.items;
  }
  loadCart(): void {
    this.items = JSON.parse(localStorage.getItem('cart_items')!) ?? [];
  }
  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.items));
  }

  clearCart(items: any) {
    this.items = [];

    localStorage.removeItem('cart_items');
  }

  removeItem(item: any) {
    const index = this.items.findIndex((o: any) => o.id === item.id);

    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }
  itemInCart(item: any): boolean {
    return this.items.findIndex((o: any) => o.id === item.id) > -1;
  }
}
