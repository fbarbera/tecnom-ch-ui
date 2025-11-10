import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsService } from '../services/appointment.service';
import { Appointment } from '../entities/appointment.entity';

@Component({
  selector: 'app-appointment-list',
  imports: [CommonModule],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css',
})
export class AppointmentList implements OnInit {
  appointments: Appointment[] = [];
  errorMessage = '';
  loading = false;

  constructor(private appointmentService: AppointmentsService) {}

  ngOnInit(): void {
      this.load();
  }

load() {
  this.loading = true;
  this.appointmentService.list().subscribe({
    next: (data) => {
     this.appointments = data.sort((a, b) => new Date(a.appointment_at).getTime() - new Date(b.appointment_at).getTime());
      this.loading = false;
    },
    error: (err) => {
      this.errorMessage = 'Error obteniendo Turnos';
      this.loading = false;
    }
  });
}


}
