import { HttpClient, } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
interface adminCategory {
  id: number;
  name: string;
}
@Component({
  selector: 'app-list-category',
  imports: [RouterModule , CommonModule],
  templateUrl: './list-category.html',
  styleUrl: './list-category.css',
})
export class ListCategory implements OnInit{
  categories: adminCategory[] = [];
  http = inject(HttpClient);
  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories(){
    this.http.get<adminCategory[]>('http://localhost:3000/categories').subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.log(err),
    });
  };
  deleteCategory(id: number) {
    if (!id) {
      return;
    }
    if (confirm('Bạn có chắc chắn muốn xóa')) {
      this.http.delete(`http://localhost:3000/categories/${id}`).subscribe({
        next: () => {
          alert('Xóa thành công');
          this.categories = this.categories.filter((item) => item.id !== id);

        },
        error: (err) => console.log(err),
      });
    }
  }
}
