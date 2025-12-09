import { Component,inject } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { ReviewCardComponent } from '../../components/review-card/review-card';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
interface Product{
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  categoryId: number;
}
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    ProductCardComponent,
    ReviewCardComponent, CommonModule 
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent {
  http = inject(HttpClient );
  route = inject(ActivatedRoute);
  product: Product | null = null;
  suggestProducts: Product[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
        const id = Number(params['id']);
      this.http.get<Product>(`http://localhost:3000/products/${id}`).subscribe({
        next: (data) => {
          this.product = data;
          this.loadSuggestProducts();
        },
        error: (err) => console.log(err)
      });
    })
  }
  loadSuggestProducts() {
    this.http.get<Product[]>(`http://localhost:3000/products`).subscribe({
      next: (data) => {
        this.suggestProducts = data.slice(0,4);
      },
      error: (err) => console.log(err)
    })
  }


}
