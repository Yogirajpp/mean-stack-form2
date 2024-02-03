// form.service.ts
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = 'http://localhost:8000/api/forms'; // replace with your actual backend API URL

  constructor() {}

  private handleResponse(response: Response): Observable<any> {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return from(response.json());
  }

  getAllForms(): Observable<any> {
    return from(
      fetch(this.apiUrl)
        .then(response => this.handleResponse(response))
    );
  }

  getForm(id: string): Observable<any> {
    return from(
      fetch(`${this.apiUrl}/${id}`)
        .then(response => this.handleResponse(response))
    );
  }

  createForm(data: any): Observable<any> {
    return from(
      fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => this.handleResponse(response))
    );
  }

  deleteForm(id: string): Observable<any> {
    return from(
      fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
      })
        .then(response => this.handleResponse(response))
    );
  }

  updateForm(id: string, data: any): Observable<any> {
    return from(
      fetch(`${this.apiUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => this.handleResponse(response))
    );
  }
}
