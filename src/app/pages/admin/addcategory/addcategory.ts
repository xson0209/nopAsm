import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
interface adminCategory {
  id: number,
  name: string
}
@Component({
  selector: 'app-addcategory',
  imports: [ReactiveFormsModule],
  templateUrl: './addcategory.html',
  styleUrl: './addcategory.css',
})
export class Addcategory {
  
  http = inject(HttpClient);
  router = inject(Router);
    categoryFrm  = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
  });
  handleSubmit = () => {

    if(!this.categoryFrm.valid) {
      alert('Tên danh mục phải có 3 ký tự');
      return;
    }
      const data: adminCategory = this.categoryFrm.value as adminCategory;
      this.http.post('http://localhost:3000/categories',data).subscribe({
        next: () => {
          alert('Them danh muc thanh cong');
          this.categoryFrm.reset({name: ''});
          this.router.navigate(['admin/categorys'])
        },
        error: (err)  => console.log(err)
      });
  };
}
