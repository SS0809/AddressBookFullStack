import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../home/home.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  constructor(private http: HttpClient) {}

  editData(person: Address): Observable<any> {
    return this.http.put('http://localhost:8090/api/updateAddress', person);
  }
}