import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ProjectsComponent } from './projects.component';
import { ProjectService } from 'src/app/shared/services/project.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Project } from 'src/app/shared/models/project.model';

describe('ProjectComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let projectService: ProjectService;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsComponent],
      imports: [FormsModule, HttpClientModule], // Add HttpClientModule to imports
      providers: [
        ProjectService,
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['isLoggedIn']),
        },
      ],
    }).compileComponents();

    projectService = TestBed.inject(ProjectService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch projects on initialization', fakeAsync(() => {
    const projects: Project[] = [];

    spyOn(projectService, 'getProjects').and.returnValue(of(projects));

    component.ngOnInit();
    tick();

    expect(component.projects).toEqual(projects);
    expect(component.loading).toBeFalsy();
  }));

  it('should add project successfully', fakeAsync(() => {
    const newProject: Project = {
      _id: '3',
      image: 'newproject.jpg',
      title: 'New Project',
      category: 'Web Development',
      description: 'Description for New Project',
      link: 'https://newproject.com',
    };

    component.newProject = newProject;
    component.addEditButtonText = 'Add Project';

    spyOn(projectService, 'addProject').and.returnValue(of(null));
    spyOn(projectService, 'getProjects').and.returnValue(of([]));

    component.addProject();
    tick();

    expect(projectService.addProject).toHaveBeenCalledWith(newProject);
    expect(component.showAddForm).toBeFalsy();
    expect(component.editIndex).toBeNull();
    expect(component.newProject).toEqual({
      _id: '',
      image: '',
      title: '',
      category: '',
      description: '',
      link: '',
    });
  }));

  it('should edit project successfully', fakeAsync(() => {
    const index = 0;
    const existingProject: Project = {
      _id: '1',
      image: 'project1.jpg',
      title: 'Project 1',
      category: 'Web Development',
      description: 'Description for Project 1',
      link: 'https://project1.com',
    };

    component.projects = [existingProject];
    component.showAddForm = false;
    component.editIndex = null;

    spyOn(projectService, 'updateProject').and.returnValue(of(null));
    spyOn(projectService, 'getProjects').and.returnValue(of([]));

    component.editProject(index);
    tick();

    expect(component.editIndex).toBe(index);
    expect(component.newProject).toEqual(existingProject);
    expect(component.showAddForm).toBeTruthy();
    expect(component.addEditButtonText).toBe('Edit Project');
  }));

  it('should delete project successfully', fakeAsync(() => {
    const index = 0;
    const existingProject: Project = {
      _id: '1',
      image: 'project1.jpg',
      title: 'Project 1',
      category: 'Web Development',
      description: 'Description for Project 1',
      link: 'https://project1.com',
    };

    component.projects = [existingProject];
    component.showAddForm = false;
    component.editIndex = null;

    spyOn(projectService, 'deleteProject').and.returnValue(of(null));
    spyOn(projectService, 'getProjects').and.returnValue(of([]));

    component.deleteProject(index);
    tick();

    expect(component.showAddForm).toBeFalsy();
    expect(component.editIndex).toBeNull();
    expect(component.newProject).toEqual({
      _id: '',
      image: '',
      title: '',
      category: '',
      description: '',
      link: '',
    });
    expect(component.addEditButtonText).toBe('Add Project');
  }));
});
