import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    WishListComponent,
    ItemDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
