// form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormService } from './form.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [FormsModule, CommonModule],
  providers: [FormService]
})
export class FormComponent implements OnInit {
  forms: any[] = [];
  newForm: any = {};
  selectedForm: any = {};
  updatedForm: any = {};
  showAlert: boolean = false; // Flag to control alert visibility
  showError: boolean = false; // Flag to control error alert visibility
  selectedFormId: string | undefined;
  // selectedFormId: string = "65be977667766ec59fb8f3dd";

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms() {
    this.formService.getAllForms().subscribe((data) => {
      this.forms = data;
    });
  }

  deleteForm(id: string) {
    this.formService.deleteForm(id).subscribe(
      () => {
        // Update forms after deletion
        this.loadForms();
      },
      (error) => {
        console.error('Error deleting form:', error);
      }
    );
  }

  submitForm() {
    // Check if any required field is empty
    if (
      !this.newForm.name ||
      !this.newForm.email ||
      !this.newForm.mobileNo ||
      !this.newForm.password ||
      !this.newForm.confirmPassword
      // Add more checks as needed
    ) {
      this.showAlert = false;
      this.showError = true;
    } else {
      // Clear error flag if no errors
      this.showError = false;

      console.log('Form Data:', this.newForm);
      this.formService.createForm(this.newForm).subscribe(
        () => {
          // Update forms after successful submission
          this.loadForms();
          // Clear the form fields
          this.newForm = {};
          // Set showAlert to true for success alert
          this.showAlert = true;
        },
        (error) => {
          console.error('Error creating form:', error);
          // Set showAlert to false in case of an error
          this.showAlert = false;
        }
      );
    }
  }

  

  
  loadFormForUpdate() {
    // Check if selectedFormId is defined before making the API call
    if (this.selectedFormId) {
      this.formService.getForm(this.selectedFormId).subscribe(
        (formData) => {
          this.selectedForm = formData;
        },
        (error) => {
          console.error('Error loading form for update:', error);
        }
      );
    } else {
      console.error('Selected Form ID is undefined.');
    }
  }

  // ... (existing code)

  updateForm(id: string | undefined) {
    // Check if id is defined before using it
    if (!id) {
      console.error('Selected Form ID is undefined.');
      return; // Exit the method if id is undefined
    }

    // Check if any required field is empty
    if (
      !this.updatedForm.name ||
      !this.updatedForm.mobileNo
      // Add more checks as needed
    ) {
      this.showAlert = false;
      this.showError = true;
    } else {
      // Clear error flag if no errors
      this.showError = false;

      console.log('Updated Form Data:', this.updatedForm);
      this.formService.updateForm(id, this.updatedForm).subscribe(
        () => {
          // Update forms after successful update
          this.loadForms();
          // Clear the form fields
          this.updatedForm = {};
          // Set showAlert to true for success alert
          this.showAlert = true;
        },
        (error) => {
          console.error('Error updating form:', error);
          // Set showAlert to false in case of an error
          this.showAlert = false;
        }
      );
    }
  }
  

  // Implement other CRUD operations as needed
}
