import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {find, map} from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  products: Observable<Product[]>;
  wishedProducts: Observable<Product[]>;
  message: Observable<string>;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.products = this.productService.getAllProducts();
    this.wishedProducts = this.productService.wishlistChanged$;
  }

  addProduct(productName: string): void {
    this.productService.addToWishlist(productName);
    this.message = this.productService.message$;
  }
}
