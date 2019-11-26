import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {Product} from '../models/product';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = `../assets/data.json`;
  public wishedProducts = JSON.parse(localStorage.getItem('products')) || [];
  private wishlistChanged = new BehaviorSubject<Product[]>(this.wishedProducts);
  wishlistChanged$ = this.wishlistChanged.asObservable();
  private totalPrice = new BehaviorSubject<number>(this.calculatePrice());
  totalPrice$ = this.totalPrice.asObservable();
  message = new BehaviorSubject<string>('');
  message$ = this.message.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  private calculatePrice() {
    return this.wishedProducts.reduce((acc, item) => acc + item.price, 0);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<any>(this.productsUrl).pipe(
      map(data => data.products),
      catchError((error) => {
        console.error('error loading the list of products', error);
        return of(`Oops! Problem with get base: ${error}`);
      })
    );
  }

  getProduct(productName: string): Observable<Product> {
    return this.getAllProducts().pipe(
      map(items => items.find(item => item.name === productName))
    );
  }

  addToWishlist(productName: string) {
    this.getProduct(productName).subscribe(product => {
      if (this.wishedProducts.find(item => item.name === productName) === undefined) {
        this.wishedProducts.push(product);
        window.localStorage.setItem('products',  JSON.stringify(this.wishedProducts));
        this.wishlistChanged.next(this.wishedProducts);
        this.totalPrice.next(this.calculatePrice());
      } else {
        this.message.next('This product is already added!');
        setTimeout(() => this.message.next(''), 3000);
      }
    });
  }

  clearWishList() {
    window.localStorage.removeItem('products');
    this.wishlistChanged.next([]);
    this.totalPrice.next(0);
    this.wishedProducts = [];
  }

  removeProduct(productName: string) {
    this.wishedProducts = this.wishedProducts.filter(item => item.name !== productName);
    this.wishlistChanged.next(this.wishedProducts);
    window.localStorage.setItem('products',  JSON.stringify(this.wishedProducts));
    this.totalPrice.next(this.calculatePrice());
  }
}
