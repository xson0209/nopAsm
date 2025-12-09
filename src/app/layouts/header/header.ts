import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Category {
  id: number;
  name: string;
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class HeaderComponent {
  keyword: string = '';
  categories: Category[] = [];
  http = inject(HttpClient);
  routers = inject(Router);
  ngOnInit() {
    this.http.get<Category[]>('http://localhost:3000/categories').subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.log(err)
    });
  }
  constructor(private router: Router) {

  }
  onSearch() {
    if (!this.keyword.trim()) return;
    this.router.navigate(['/'], {
      queryParams: {search: this.keyword}
    });
  }
  goToCategory(id: number) {
    this.routers.navigate(['/category',id]);
  }
}