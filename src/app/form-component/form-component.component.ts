import { Component, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent {
  
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() closeForm = new EventEmitter<void>();

  constructor(private createService: CreateService) {}

  addressForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipCode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{6}$")]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")])
  });

  onSubmit() {
    if (this.addressForm.valid) {
      const formData = this.addressForm.getRawValue();
      this.createService.submitForm(formData).subscribe({
        next: (response) => {
          console.log('Form Submitted Successfully:', response);
          this.formSubmitted.emit(formData); 
          this.closeForm.emit(); 
        },
        error: (error) => {
          console.error('Error submitting form:', error);
          alert('Failed to submit form!');
        }
      });
    } else {
      console.log("Form is invalid");
    }
  }
}
