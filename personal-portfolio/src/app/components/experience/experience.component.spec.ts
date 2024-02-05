import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ExperienceComponent } from './experience.component';
import { ExperienceService } from 'src/app/shared/services/experience.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Experience } from 'src/app/shared/models/experience.model';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let experienceService: ExperienceService;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceComponent],
      imports: [FormsModule, HttpClientModule], // Add HttpClientModule to imports
      providers: [
        ExperienceService,
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['isLoggedIn']),
        },
      ],
    }).compileComponents();

    experienceService = TestBed.inject(ExperienceService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
  });

  it('should fetch experiences on initialization', fakeAsync(() => {
    const experiences: Experience[] = [
      // Provide some sample data if needed
    ];

    spyOn(experienceService, 'getExperiences').and.returnValue(of(experiences));

    component.ngOnInit();
    tick();

    expect(component.experiences).toEqual(experiences);
    expect(component.loading).toBeFalsy();
  }));

  it('should add experience successfully', fakeAsync(() => {
    const newExperience: Experience = {
      _id: '1',
      title: 'Software Developer',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
      skills: 'Angular, TypeScript',
      description: 'Worked on web development projects.',
    };

    component.newExperience = newExperience;
    component.addEditButtonText = 'Add Experience';

    spyOn(experienceService, 'addExperience').and.returnValue(of(null));
    spyOn(experienceService, 'getExperiences').and.returnValue(of([]));

    component.addExperience();
    tick();

    expect(experienceService.addExperience).toHaveBeenCalledWith(newExperience);
    expect(component.showAddForm).toBeFalsy();
    expect(component.editIndex).toBeNull();
    expect(component.newExperience).toEqual({
      _id: '',
      title: '',
      startDate: '',
      endDate: '',
      skills: '',
      description: '',
    });
  }));

  it('should edit experience successfully', fakeAsync(() => {
    const index = 0;
    const existingExperience: Experience = {
      _id: '1',
      title: 'Software Developer',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
      skills: 'Angular, TypeScript',
      description: 'Worked on web development projects.',
    };

    component.experiences = [existingExperience];
    component.showAddForm = false;
    component.editIndex = null;

    spyOn(experienceService, 'updateExperience').and.returnValue(of(null));
    spyOn(experienceService, 'getExperiences').and.returnValue(of([]));

    component.editExperience(index);
    tick();

    expect(component.editIndex).toBe(index);
    expect(component.newExperience).toEqual(existingExperience);
    expect(component.showAddForm).toBeTruthy();
    expect(component.addEditButtonText).toBe('Edit Experience');
  }));

  it('should delete experience successfully', fakeAsync(() => {
    const index = 0;
    const existingExperience: Experience = {
      _id: '1',
      title: 'Software Developer',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
      skills: 'Angular, TypeScript',
      description: 'Worked on web development projects.',
    };

    component.experiences = [existingExperience];
    component.showAddForm = false;
    component.editIndex = null;

    spyOn(experienceService, 'deleteExperience').and.returnValue(of(null));
    spyOn(experienceService, 'getExperiences').and.returnValue(of([]));

    component.deleteExperience(index);
    tick();

    expect(component.showAddForm).toBeFalsy();
    expect(component.editIndex).toBeNull();
    expect(component.newExperience).toEqual({
      _id: '',
      title: '',
      startDate: '',
      endDate: '',
      skills: '',
      description: '',
    });
    expect(component.addEditButtonText).toBe('Add Experience');
  }));
});
