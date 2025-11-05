import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AmbienteComponent } from './components/ambiente/ambiente.component';
import { RiegoComponent } from './components/riego/riego.component';
import { NutrientesComponent } from './components/nutrientes/nutrientes.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { HistorialComponent } from './components/historial/historial.component';
import { AlertasComponent } from './components/alertas/alertas.component';
import { ConfigComponent } from './components/config/config.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'ambiente', component: AmbienteComponent },
    { path: 'riego', component: RiegoComponent },
    { path: 'nutrientes', component: NutrientesComponent },
    { path: 'equipos', component: EquiposComponent },
    { path: 'historial', component: HistorialComponent },
    { path: 'alertas', component: AlertasComponent },
    { path: 'config', component: ConfigComponent }
];
