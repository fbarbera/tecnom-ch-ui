import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Appointment } from './appointment/appointment';
import { AppointmentList } from './appointment-list/appointment-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tecnomBoxex');
}
