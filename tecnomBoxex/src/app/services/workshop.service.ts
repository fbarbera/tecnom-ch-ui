import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Workshop } from "../entities/workshop.entity";

@Injectable({ providedIn: 'root' })
export class WorkshopService {
    private base = 'http://localhost:5101/api/Workshop';
    constructor(private http: HttpClient) {}

    list(): Observable<Workshop[]> {
        return this.http.get<Workshop[]>(this.base);
    }
}