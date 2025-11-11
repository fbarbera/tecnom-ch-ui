import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkshopService } from '../services/workshop.service';
import { AppointmentsService } from '../services/appointment.service';
import { Workshop } from '../entities/workshop.entity';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-appointment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css'
})
export class Appointment implements OnInit {
  form: FormGroup;
  workshops: Workshop[] = [];
  loading = false;
  successMessage = '';
  errorMessage = '';
  carBrands: string[] = [
    'Toyota', 'Volkswagen', 'Ford', 'Chevrolet', 'Fiat',
    'Renault', 'Peugeot', 'Nissan', 'Honda', 'Citroën',
    'Jeep', 'Hyundai', 'Kia', 'Mercedes-Benz', 'BMW',
    'Audi', 'Suzuki', 'Chery', 'Mitsubishi', 'Dongfeng'
  ];
  submitted = false;
  private routerSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private ws: WorkshopService,
    private apptSvc: AppointmentsService
  , private router: Router
  , private route: ActivatedRoute
  ) {
    this.form = this.fb.nonNullable.group({
      place_id: [null, Validators.required],
      appointment_at: [null, Validators.required],
      service_type: ['', Validators.required],
      contact: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['']
      }),
      vehicle: this.fb.group({
        make: [''],
        model: [''],
        year: [''],
        license_plate: ['']
      })
    });
  }

  ngOnInit() {
    // If resolver provided workshops, use them, otherwise request
    const data = this.route.snapshot.data as { workshops?: Workshop[] };
    if (data.workshops) {
      this.workshops = data.workshops;
    } else {
      this.loadWorkshops();
    }

    // ensure workshops are reloaded after navigation (routerLink clicks)
    this.routerSub = this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => this.loadWorkshops());
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  private loadWorkshops() {
    this.ws.list().subscribe({
      next: (data) => {
        this.workshops = data;
      },
      error: (err) => this.errorMessage = 'Error obteniendo talleres'
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const payload = this.form.value;
    // ensure ISO string for date if using date/time pickers
    payload.appointment_at = new Date(payload.appointment_at).toISOString();

    this.apptSvc.create(payload).subscribe({
      next: (res) => {
        this.successMessage = 'Turno creado correctamente';
        this.form.reset();
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.error || 'Error al crear turno';
        this.loading = false;
      }
    });
  }
}