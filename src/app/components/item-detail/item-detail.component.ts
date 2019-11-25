import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  @Input() product: Product;

  constructor() { }

  ngOnInit() {
  }

}
