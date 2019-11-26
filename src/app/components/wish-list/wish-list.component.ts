import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  products: Observable<Product[]>;
  price: Observable<number>;
  clicked: Product;
  navigationEnd: Observable<NavigationEnd>;

  constructor(
    private productsService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.products = this.productsService.wishlistChanged$;
    this.price = this.productsService.totalPrice$;
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(event => {
      this.productsService.getProduct(decodeURI(event.url.slice(1))).subscribe(product => {
          this.clicked = product;
        });
      });
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
