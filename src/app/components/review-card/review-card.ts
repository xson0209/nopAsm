import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-card',
  standalone: true,
  templateUrl: './review-card.html',
  styleUrl: './review-card.css'
})
export class ReviewCardComponent {
  @Input() name = '';
  @Input() rating = 5;
  @Input() text = '';
  @Input() date = '';
}
