import { Routes } from '@angular/router';
import { AppointmentList } from './appointment-list/appointment-list';
import { Appointment } from './appointment/appointment';

export const routes: Routes = [
  { path: 'appointments', component: AppointmentList },
  { path: 'appointment/new', component: Appointment },
  { path: '', redirectTo: 'appointments', pathMatch: 'full' }
];