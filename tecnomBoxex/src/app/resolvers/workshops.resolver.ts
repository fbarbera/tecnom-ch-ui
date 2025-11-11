import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Workshop } from '../entities/workshop.entity';
import { WorkshopService } from '../services/workshop.service';

@Injectable({ providedIn: 'root' })
export class WorkshopsResolver implements Resolve<Workshop[]> {
  constructor(private ws: WorkshopService) {}

  resolve(): Observable<Workshop[]> {
    return this.ws.list();
  }
}
