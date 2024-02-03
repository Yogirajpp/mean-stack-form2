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
  imports: [FormsModule , CommonModule],
  providers: [FormService]
})
export class FormComponent implements OnInit {
  forms: any[] = [];
  newForm: any = {};
  showAlert: boolean = false; // Flag to control alert visibility

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
    console.log('Form Data:', this.newForm);
    this.formService.createForm(this.newForm).subscribe(
      () => {
        // Update forms after successful submission
        this.loadForms();
        // Clear the form fields
        this.newForm = {};
        
      },
      (error) => {
        console.error('Error creating form:', error);
        // Set formSubmitted to false in case of an error
      }
    )}



  // Implement other CRUD operations as needed
}
