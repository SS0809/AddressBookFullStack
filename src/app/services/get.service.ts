import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  
  private apiUrl = 'http://localhost:8090/api/getAddresses';
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  deleteData(person: Address) {
    const payload = {
      id: person.id
    };
    
    this.http.delete('http://localhost:8090/api/deleteAddress', {
      body: payload
    }).subscribe({
      next: (data) => {
        console.log('Data deleted:', data);
      },
      error: (err) => {
        console.error('Error deleting data:', err);
      }
    });
  }
  
  editData(person: Address) {
    this.http.put('http://localhost:8090/api/updateAddress', person).subscribe({
      next: (data) => {
        console.log('Data edited:', data);
      },
      error: (err) => {
        console.error('Error editing data:', err);
      }
    });
  }

  
}
