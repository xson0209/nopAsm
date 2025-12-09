import { Component } from '@angular/core';
import { FooterComponent } from '../../layouts/footer/footer';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FooterComponent], 
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent  {

}
