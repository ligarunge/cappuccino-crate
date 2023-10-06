import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MatTableDataSource } from '@angular/material/table';

interface Food {
  category: string;
  categoryLabel: string;
  foodId: string;
  image: string;
  knownAs: string;
  label: string;
  nutrients: {
    CHOCDF: number;
    ENERC_KCAL: number;
    FAT: number;
    FIBTG: number;
    PROCNT: number;
  };
  uri: string;
}

interface CartItem {
  food: Food;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  displayedColumns: string[] = ['image', 'label', 'quantity', 'price', 'total', 'remove'];
  tableDataSource = new MatTableDataSource<CartItem>();


  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.tableDataSource.data = this.cartItems;
    });
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  get totalItemsInCart(): number {
    return this.cartService.totalItems;
  }

  removeItem(foodId: string) {
    this.cartService.removeFromCart(foodId);
  }

  addItem(foodId: string) {
    this.cartService.incrementCart(foodId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  get isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }

}

