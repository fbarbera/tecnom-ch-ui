import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsService } from '../services/appointment.service';
import { WorkshopService } from '../services/workshop.service';
import { Appointment } from '../entities/appointment.entity';
import { Workshop } from '../entities/workshop.entity';
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-appointment-list',
  imports: [CommonModule],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css',
})
export class AppointmentList implements OnInit {
  appointments: Appointment[] = [];
  workshops: Workshop[] = [];
  errorMessage = '';
  loading = false;

  constructor(
    private appointmentService: AppointmentsService,
    private workshopService: WorkshopService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    
    // Cargar talleres y turnos en paralelo
    forkJoin({
      appointments: this.appointmentService.list(),
      workshops: this.workshopService.list()
    }).subscribe({
      next: (data) => {
        this.workshops = data.workshops;
        this.appointments = data.appointments.sort(
          (a, b) => new Date(a.appointment_at).getTime() - new Date(b.appointment_at).getTime()
        );
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error obteniendo Turnos';
        this.loading = false;
      }
    });
  }

  // Método helper para obtener el nombre del taller
  getWorkshopName(placeId: number): string {
    const workshop = this.workshops.find(w => w.id === placeId);
    return workshop?.name || 'No especificado';
  }
}