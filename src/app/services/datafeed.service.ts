import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatafeedService {

  constructor(private http: HttpClient) { }

  getEmployeeDetails(): Observable<any> {
    return this.http.get('assets/data/employeeDetails.json');
  }
}
