import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { ProductDetailComponent } from './pages/product-detail/product-detail';
import { CategoryPage } from './pages/category/category';
import { CartComponent } from './pages/cart/cart';
import { ListProduct } from './pages/admin/list-product/list-product';
import { ListCategory } from './pages/admin/list-category/list-category';
import { Addproduct } from './pages/admin/addproduct/addproduct';
import { Addcategory } from './pages/admin/addcategory/addcategory';
import { Editproduct } from './pages/admin/editproduct/editproduct';
import { Editcategory } from './pages/admin/editcategory/editcategory';
import { Admin } from './pages/admin/admin';
export const routes: Routes = [
 { path: '', component: HomePage },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'category/:id', component: CategoryPage },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'admin/products', component: ListProduct
  },
  {
    path: 'admin/categorys', component: ListCategory
  },
  {
    path: 'admin/addproducts', component: Addproduct
  },
  {
    path: 'admin/addcategorys', component: Addcategory
  },
  {
    path: 'admin/edit-product/:id', component: Editproduct
  },
  {
    path: 'admin/edit-category/:id', component: Editcategory
  },
  {
    path:'admin', component: Admin
  },
];
