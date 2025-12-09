import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
interface adminProduct{
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  categoryId: number;
} 
interface adminCategory {
  id: number,
  name: string
}
@Component({
  selector: 'app-addproduct',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addproduct.html',
  styleUrl: './addproduct.css',
})
export class Addproduct {
  categories: adminCategory[] = [];
  http = inject(HttpClient);
  router = inject(Router);
  productFrm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    image:new FormControl('',Validators.required),
    price:new FormControl(0,Validators.required),
    categoryId: new FormControl(1, Validators.required),
    rating: new FormControl(5),
  });
  ngOnInit() {
    this.http.get<adminCategory[]>('http://localhost:3000/categories').subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.log(err),
    });
  }


  handleSubmit = () => {
    if(!this.productFrm.valid) {
      alert('Sai Nhập Lại');
      return;
    };
    const data: adminProduct = this.productFrm.value as adminProduct;
    this.http.post('http://localhost:3000/products',data).subscribe({
      next: () => {
        alert('Them san pham thanh cong ');
        this.productFrm.reset({
          name: '',
          image: '',
          price: 0,
          categoryId: 1,
          rating: 5
        });
        this.router.navigate(['/admin/products'])
      },
      error: (err) => console.log(err)
    });
  };
}
