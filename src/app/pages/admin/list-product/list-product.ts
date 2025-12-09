import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
interface adminProduct{
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  categoryId: number;
}
@Component({
  selector: 'app-list-product',
  imports: [CommonModule, RouterModule],
  templateUrl: './list-product.html',
  styleUrl: './list-product.css',
})
export class ListProduct implements OnInit{
  route = inject(ActivatedRoute);
  products: adminProduct[] = [];
  http = inject(HttpClient);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const keyword = params['search'];
      if (keyword) {
          this.searchProduct(keyword);
      } else {
        this.loadProduct();
      }
    });
  }
  searchProduct(keyword:string){
    this.http.get<adminProduct[]>(`http://localhost:3000/products?name_like=${keyword}`).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.log(err)
    });
  }
  loadProduct() {
    this.http.get<adminProduct[]>('http://localhost:3000/products').subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.log(err),
    });
  }
  deleteProduct(id: number) {
    if (!id) {
      return;
    }
    if (!confirm("Bạn có chắc chắn muốn xóa")) {
      return;
    }
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe({
      next: () => {
        alert('xóa thành công');
        this.products = this.products.filter((item) => item.id !== id);
      },
      error: (err) => console.log(err),
    });
  }
}
