import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { environment } from 'src/environments/environment';

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
  addedToCart?: boolean;
}

interface ApiResponse {
  hints: Hint[];
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  items: Hint[] = [];
  searchTerm: string = 'cookies';
  nutrients: boolean = false;
  isLoading: boolean = true;

  constructor(private http: HttpClient, private cartService: CartService) { }

  ngOnInit() {
    this.fetchData();
  }

  setSearchTerm(term: string) {
    this.searchTerm = term;
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    const myKey = environment.apiKey;
    const url = `https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?nutrition-type=cooking&ingr=${this.searchTerm}`;
    const headers = {
      'X-RapidAPI-Key': myKey,
      'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
    };

    this.http.get<ApiResponse>(url, { headers }).subscribe({
      next: response => {
        this.items = response.hints.filter(item => item.food.image).map(item => {
          item.displayNutrients = false;
          item.price = item.price || this.generateRandomPrice();
          return item;
        });
        this.isLoading = false;
      },
      error: error => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }

  displayNutrients(item: Hint) {
    item.displayNutrients = !item.displayNutrients;
  }

  generateRandomPrice(): number {
    const randomInt = Math.floor(Math.random() * (10 - 6 + 1) + 6);
    return randomInt / 2;
  }

  addToCart(item: Hint) {
    this.cartService.addToCart(item);
    item.addedToCart = true;

    setTimeout(() => {
      item.addedToCart = false;
    }, 600);
  }

}
