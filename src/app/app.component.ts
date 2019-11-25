import { Component } from '@angular/core';
import {Product} from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wishlist';
  product: Product;

  onSelected(product: Product) {
    this.product = product;
  }
}
