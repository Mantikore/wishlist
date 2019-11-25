import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  products: Observable<Product[]>;
  price: Observable<number>;
  @Output() selected = new EventEmitter<Product>();

  constructor(
    private productsService: ProductService
  ) { }

  ngOnInit() {
    this.products = this.productsService.wishlistChanged$;
    this.price = this.productsService.totalPrice$;
  }

  onSelect(product: Product) {
    this.selected.emit(product);
  }

  clearWishlist() {
    this.productsService.clearWishList();
  }

  removeProduct(product) {
    this.productsService.removeProduct(product);
  }
}
