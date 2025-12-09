import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { ReviewCardComponent } from '../../components/review-card/review-card';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, ReviewCardComponent, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomePage {
  route = inject(ActivatedRoute);
  products: any[] = [];
  newArrivals: any[] = [];
  topSelling: any[] = [];
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const keyword = params['search'];
      if (keyword) {
        this.searchProduct(keyword);
      } else {
        this.http.get<any[]>('http://localhost:3000/products').subscribe(data => {
          this.products = data;
          this.newArrivals = this.products.slice(0,4);
          this.topSelling = this.products.slice(0,4);
        });
      }
    })
  }
  searchProduct(keyword: string) {
    this.http.get<any[]>(`http://localhost:3000/products?name_like=${keyword}`).subscribe(data => {
      this.products = data;
      this.newArrivals = data;
      this.topSelling = []
    });
  }
}