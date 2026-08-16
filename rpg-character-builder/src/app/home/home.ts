import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  tagline: string = 'Design a character, roll for stats, and bring your hero to life.';
}
