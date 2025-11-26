import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {

  sidebarVisible = true;

  apiUrl = "https://xmhh9ns702.execute-api.us-east-2.amazonaws.com/prod/data";

  data: any[] = [];
  alertas: string[] = [];

  tempChart: any;
  humidityChart: any;
  soilChart: any;
  pumpChart: any;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    // 👇 Espera a que Angular pinte el HTML antes de crear gráficas
    setTimeout(() => this.cargarDatos(), 300);
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  get ultimo() {
    return this.data.length > 0 ? this.data[this.data.length - 1] : null;
  }

  cargarDatos() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (response) => {
        this.data = response;
        this.generarAlertas();
        this.crearGraficas();
      },
      error: (err) => console.error("Error al cargar datos", err)
    });
  }

  generarAlertas() {
    this.alertas = [];
    if (!this.ultimo) return;

    const u = this.ultimo;

    if (u.soil_dry) this.alertas.push("⚠️ El suelo está seco.");
    if (!u.water_level_ok) this.alertas.push("💧 Nivel de agua bajo.");
    if (u.rain_detected) this.alertas.push("🌧️ Lluvia detectada.");
    if (u.pump_running) this.alertas.push("🚰 Bomba funcionando.");

    if (this.alertas.length === 0)
      this.alertas.push("Todo está funcionando correctamente.");
  }

  crearGraficas() {
    const labels = this.data.map((_, i) => `#${i + 1}`);

    const tempData = this.data.map(d => d.temperature);
    const humidityData = this.data.map(d => d.humidity);
    const soilData = this.data.map(d => d.soil_dry ? 1 : 0);
    const pumpData = this.data.map(d => d.pump_running ? 1 : 0);

    // Destruir previas
    this.tempChart?.destroy();
    this.humidityChart?.destroy();
    this.soilChart?.destroy();
    this.pumpChart?.destroy();

    // Crear gráficas usando LOS MISMOS IDs que el HTML
    this.tempChart = new Chart('chartTemperature', {
      type: 'line',
      data: { labels, datasets: [{ label: 'Temperatura (°C)', data: tempData, borderWidth: 2 }] }
    });

    this.humidityChart = new Chart('chartHumidity', {
      type: 'line',
      data: { labels, datasets: [{ label: 'Humedad (%)', data: humidityData, borderWidth: 2 }] }
    });

    this.soilChart = new Chart('chartSoil', {
      type: 'line',
      data: { labels, datasets: [{ label: 'Suelo seco (1=Sí)', data: soilData, borderWidth: 2 }] }
    });

    this.pumpChart = new Chart('chartPump', {
      type: 'line',
      data: { labels, datasets: [{ label: 'Bomba activa (1=Sí)', data: pumpData, borderWidth: 2 }] }
    });
  }
}
