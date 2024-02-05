import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService],
    });

    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get projects', fakeAsync(() => {
    const mockProjects = [{ id: '1', title: 'Project 1' }];

    service.getProjects().subscribe((projects) => {
      expect(projects).toEqual(mockProjects);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);

    tick();
  }));

  it('should get project by id', fakeAsync(() => {
    const projectId = '1';
    const mockProject = { id: projectId, title: 'Project 1' };

    service.getProjectById(projectId).subscribe((project) => {
      expect(project).toEqual(mockProject);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${projectId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProject);

    tick();
  }));

  it('should add project', fakeAsync(() => {
    const mockProject = { title: 'New Project' };

    service.addProject(mockProject).subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/add`);
    expect(req.request.method).toBe('POST');
    req.flush({}); // Simulate a successful response

    tick();
  }));

  it('should update project', fakeAsync(() => {
    const projectId = '1';
    const mockUpdatedProject = { title: 'Updated Project' };

    service.updateProject(projectId, mockUpdatedProject).subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/update/${projectId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({}); // Simulate a successful response

    tick();
  }));

  it('should delete project', fakeAsync(() => {
    const projectId = '1';

    service.deleteProject(projectId).subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/delete/${projectId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({}); // Simulate a successful response

    tick();
  }));
});
