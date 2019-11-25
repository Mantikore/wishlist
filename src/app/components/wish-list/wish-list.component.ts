import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  products: Observable<Product[]>;
  price: Observable<number>;
  clicked;

  constructor(
    private productsService: ProductService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.products = this.productsService.wishlistChanged$;
    this.price = this.productsService.totalPrice$;
  }

  onSelect(product: Product) {
    this.clicked = product;
  }

  clearWishlist() {
    this.productsService.clearWishList();
  }

  removeProduct(product) {
    event.preventDefault();
    this.productsService.removeProduct(product);
  }
}
