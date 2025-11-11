import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsService } from '../services/appointment.service';
import { WorkshopService } from '../services/workshop.service';
import { Appointment } from '../entities/appointment.entity';
import { Workshop } from '../entities/workshop.entity';
import { forkJoin } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

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
  private routerSub?: Subscription;

  constructor(
    private appointmentService: AppointmentsService,
    private workshopService: WorkshopService
  , private router: Router
    , private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Read data resolved by route resolvers (preloaded by the router)
    const data = this.route.snapshot.data as { appointments?: any; workshops?: any };
    if (data.appointments) {
      this.appointments = (data.appointments as Appointment[]).sort((a, b) => new Date(a.appointment_at).getTime() - new Date(b.appointment_at).getTime());
    }
    if (data.workshops) {
      this.workshops = data.workshops as Workshop[];
    }
  this.loading = false;

    // still watch navigation end to reload when necessary (e.g., manual refresh of same route)
    this.routerSub = this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => this.load());
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
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


  getWorkshopName(placeId: number): string {
    const workshop = this.workshops.find(w => w.id === placeId);
    return workshop?.name || 'No especificado';
  }
}