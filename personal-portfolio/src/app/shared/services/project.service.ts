import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl =
    'https://abhay-personal-portfolio-backend.onrender.com/api/projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getProjectById(projectId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${projectId}`);
  }

  addProject(project: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, project);
  }

  updateProject(projectId: string, updatedProject: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/update/${projectId}`,
      updatedProject
    );
  }

  deleteProject(projectId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${projectId}`);
  }
}
