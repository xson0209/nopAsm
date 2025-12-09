import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-editproduct',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editproduct.html',
  styleUrl: './editproduct.css',
})
export class Editproduct {
  categories: adminCategory[] = [];
    http = inject(HttpClient);
    route = inject(ActivatedRoute);
    router = inject(Router);
    productFrm = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.minLength(3)]),
      image:new FormControl('',Validators.required),
      price:new FormControl(0,Validators.required),
      categoryId: new FormControl(1, Validators.required),
      rating: new FormControl(5),
    });
    productId = this.route.snapshot.params['id']

    ngOnInit() {
      this.http.get<adminCategory[]>('http://localhost:3000/categories').subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (err) => console.log(err),
      });
      this.http.get<adminProduct>('http://localhost:3000/products/' + this.productId).subscribe({
        next: (data) => {
          this.productFrm.controls.name.setValue(data.name);
          this.productFrm.controls.image.setValue(data.image);
          this.productFrm.controls.price.setValue(data.price);
          this.productFrm.controls.categoryId.setValue(data.categoryId);
        },
        error: (err) => console.log(err)
      });


    }
  
  
    handleSubmit = () => {
      if(!this.productFrm.valid) {
        alert('Sai! nhập lại');
        return;
      };
      const data: adminProduct = this.productFrm.value as adminProduct;
      this.http.put('http://localhost:3000/products/'+ this.productId, data).subscribe({
        next: () => {
          alert('Cap nhap san pham thanh cong ');
          this.router.navigate(['/admin/products']);
          this.productFrm.reset({
            name: '',
            image: '',
            price: 0,
            categoryId: 1,
            rating: 5
          });
        },
        error: (err) => console.log(err)
      });
    };
}
