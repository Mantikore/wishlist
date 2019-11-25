import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemDetailComponent} from './components/item-detail/item-detail.component';


const routes: Routes = [
      {path: ':name', component: ItemDetailComponent},
      {path: '', component: ItemDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
