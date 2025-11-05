import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-riego',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './riego.component.html',
  styleUrls: ['./riego.component.css']
})
export class RiegoComponent {
  sidebarVisible = true;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
