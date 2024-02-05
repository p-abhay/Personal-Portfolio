import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private apiUrl = 'http://localhost:3000/api/experiences'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getExperiences(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getExperienceById(experienceId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${experienceId}`);
  }

  addExperience(experience: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, experience);
  }

  updateExperience(
    experienceId: string,
    updatedExperience: any
  ): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/update/${experienceId}`,
      updatedExperience
    );
  }

  deleteExperience(experienceId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${experienceId}`);
  }
}
