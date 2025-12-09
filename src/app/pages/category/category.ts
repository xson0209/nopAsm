import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  categoryId: number;
}
interface Category {
  id: number;
  name: string;
}
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ProductCardComponent,CommonModule],

  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class CategoryPage  {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  products: Product[] = [];
  categoryId = 0;
  categoryName = '';
  ngOnInit() {
    this.route.params.subscribe(params => {
        this.categoryId = Number(params['id']);
      this.http.get<Category>(`http://localhost:3000/categories/${this.categoryId}`).subscribe({
        next: (data) => {
          this.categoryName = data.name;
        },
        error: (err1) => console.log(err1),
      });
      this.http.get<Product[]>(`http://localhost:3000/products?categoryId=${this.categoryId}`).subscribe({
        next: (data) => this.products = data,
        error: (err) => console.log(err)
      })
    });
  }
}
