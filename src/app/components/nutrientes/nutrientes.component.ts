import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nutrientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nutrientes.component.html',
  styleUrls: ['./nutrientes.component.css']
})
export class NutrientesComponent {
  sidebarVisible = true;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
