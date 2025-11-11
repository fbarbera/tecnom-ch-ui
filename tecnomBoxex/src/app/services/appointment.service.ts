import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment, AppointmentCreate } from '../entities/appointment.entity';
import { ConfigService } from '../config.service';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
    private http = inject(HttpClient);
    private config = inject(ConfigService);

    list(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(`${this.config.apiBaseUrl}/Appointment/getAll`);
    }

    create(payload: AppointmentCreate): Observable<Appointment> {
        return this.http.post<Appointment>(`${this.config.apiBaseUrl}/Appointment/create`, payload);
    }
}