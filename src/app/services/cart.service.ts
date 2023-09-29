import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

interface Hint {
  food: Food;
  measures: any[];
  displayNutrients?: boolean;
  price?: number;
}

interface CartItem {
  food: Food;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

  getCartItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(item: Hint) {
    if (!item.price) {
      return;
    }
    const existingItem = this.cartItems.find(cartItem => cartItem.food.foodId === item.food.foodId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        food: item.food,
        quantity: 1,
        price: item.price
      });
    }
    this.cartSubject.next(this.cartItems);
  }

  get totalItems(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  removeFromCart(foodId: string) {
    const index = this.cartItems.findIndex(cartItem => cartItem.food.foodId === foodId);
    
    if (index !== -1) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity -= 1;
      } else {
        this.cartItems.splice(index, 1);
      }
      this.cartSubject.next(this.cartItems);
    }
  }

  incrementCart(foodId: string) {
    const existingItem = this.cartItems.find(cartItem => cartItem.food.foodId === foodId);
    
    if (existingItem) {
      existingItem.quantity += 1;
      this.cartSubject.next([...this.cartItems]);
    }
  }
  
  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

}
