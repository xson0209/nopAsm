import { Component, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header';
import { FooterComponent } from './layouts/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent, FooterComponent],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}