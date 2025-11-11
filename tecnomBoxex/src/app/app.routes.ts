import { Routes } from '@angular/router';
import { AppointmentList } from './appointment-list/appointment-list';
import { Appointment } from './appointment/appointment';
import { WorkshopsResolver } from './resolvers/workshops.resolver';
import { AppointmentsResolver } from './resolvers/appointments.resolver';

export const routes: Routes = [
  { path: 'appointments', component: AppointmentList, resolve: { appointments: AppointmentsResolver, workshops: WorkshopsResolver } },
  { path: 'appointment/new', component: Appointment, resolve: { workshops: WorkshopsResolver } },
  { path: '', redirectTo: 'appointments', pathMatch: 'full' }
];