import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Workshop } from "../entities/workshop.entity";
import { ConfigService } from "../config.service";

@Injectable({ providedIn: 'root' })
export class WorkshopService {
    private http = inject(HttpClient);
    private config = inject(ConfigService);

    list(): Observable<Workshop[]> {
        return this.http.get<Workshop[]>(this.config.apiBaseUrl + '/Workshop');
    }
}