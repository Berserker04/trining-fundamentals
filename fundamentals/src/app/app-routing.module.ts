import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsMainComponent } from './components/products-main/products-main.component';
import { TypeOfProductsComponent } from './components/type-of-products/type-of-products.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsMainComponent,
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  { path: 'types', component: TypeOfProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
