import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule,RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  currentTheme: string = 'pink';

  themes = [
    { name: 'pink',     label: 'Pink',     color: '#ff85a1' },
    { name: 'lavender', label: 'Lavender', color: '#b39ddb' },
    { name: 'mint',     label: 'Mint',     color: '#4db6ac' },
    { name: 'peach',    label: 'Peach',    color: '#ffb74d' },
    { name: 'gray',     label: 'Gray',     color: '#90a4ae' },
  ];

  setTheme(theme: string) {
    this.currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
  }
}
