import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment, AppointmentCreate } from '../entities/appointment.entity';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
    private getAllUrl = 'http://localhost:5101/api/Appointment/getAll';
    private createAppointmentUrl = 'http://localhost:5101/api/Appointment/create';

    constructor(private http: HttpClient) { }

    list(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(this.getAllUrl);
    }

    create(payload: AppointmentCreate): Observable<Appointment> {
        return this.http.post<Appointment>(this.createAppointmentUrl, payload);
    }
}