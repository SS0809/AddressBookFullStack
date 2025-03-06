import { Component } from '@angular/core';
import { GetService } from '../services/get.service';
import { CommonModule } from '@angular/common';
import { FormComponentComponent } from '../form-component/form-component.component';

export interface Address {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  id: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule ,FormComponentComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  addresses: Address[] = [];
  showForm = false;

  constructor(private getService: GetService) {
    this.fetchData();
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  fetchData() {
    this.getService.getData().subscribe({
      next: (data: Address[]) => {
        this.addresses = data;
        console.log('Data received:', this.addresses);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }

  addNewPerson(person: Address) {
    this.addresses.push(person);
    this.showForm = false;
  }

  deleteAddress(person: Address) {
    this.getService.deleteData(person)
  }
  editAddress(person: Address) {
    this.getService.editData(person)
  }
}
