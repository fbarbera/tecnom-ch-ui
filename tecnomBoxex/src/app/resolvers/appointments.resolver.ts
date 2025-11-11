import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Appointment } from '../entities/appointment.entity';
import { AppointmentsService } from '../services/appointment.service';

@Injectable({ providedIn: 'root' })
export class AppointmentsResolver implements Resolve<Appointment[]> {
  constructor(private appt: AppointmentsService) {}

  resolve(): Observable<Appointment[]> {
    return this.appt.list();
  }
}
