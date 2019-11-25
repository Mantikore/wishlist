import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {of} from 'rxjs';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productsService.getProduct(params.name).subscribe(data => this.product = data);
    });
  }
}
