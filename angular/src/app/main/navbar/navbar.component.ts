import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  collapsed:boolean;

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  constructor() {
    this.collapsed = true
  }

}
