import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
interface adminCategory{
  id: number;
  name: string;
}
@Component({
  selector: 'app-editcategory',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editcategory.html',
  styleUrl: './editcategory.css',
})
export class Editcategory {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);
  categoryId = this.route.snapshot.params['id'];

  categoryFrm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  ngOnInit() {
    this.http.get<adminCategory>('http://localhost:3000/categories/'+ this.categoryId).subscribe({
      next: (data) => {
        this.categoryFrm.controls.name.setValue(data.name);
      },
      error: (err) => console.log(err),
    });
  }
  handleSubmit = () => {
    if (!this.categoryFrm.valid) {
      alert('Tên danh mục phải có 3 ký tự');
      return;
    };
    const data: adminCategory = this.categoryFrm.value as adminCategory;
    this.http.put('http://localhost:3000/categories/' + this.categoryId,data).subscribe({
      next: () => {
        alert('Cập nhập thành công');
        this.router.navigate(['/admin/list-category']);
      },
      error: (err) => console.log(err),
    })

  }
}

