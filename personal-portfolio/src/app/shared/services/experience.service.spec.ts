import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ExperienceService } from './experience.service';

describe('ExperienceService', () => {
  let service: ExperienceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExperienceService],
    });

    service = TestBed.inject(ExperienceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get experiences', fakeAsync(() => {
    const mockExperiences = [
      { id: '1', title: 'Experience 1' },
      { id: '2', title: 'Experience 2' },
    ];

    service.getExperiences().subscribe((experiences) => {
      expect(experiences).toEqual(mockExperiences);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockExperiences);

    tick();
  }));

  it('should get experience by id', fakeAsync(() => {
    const experienceId = '1';
    const mockExperience = { id: experienceId, title: 'Experience 1' };

    service.getExperienceById(experienceId).subscribe((experience) => {
      expect(experience).toEqual(mockExperience);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${experienceId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockExperience);

    tick();
  }));

  it('should add experience', fakeAsync(() => {
    const newExperience = { title: 'New Experience' };

    service.addExperience(newExperience).subscribe((result) => {
      expect(result).toBeTruthy(); // Customize based on your API response
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/add`);
    expect(req.request.method).toBe('POST');
    req.flush({}); // Simulate a successful response

    tick();
  }));

  it('should update experience', fakeAsync(() => {
    const experienceId = '1';
    const updatedExperience = { title: 'Updated Experience' };

    service
      .updateExperience(experienceId, updatedExperience)
      .subscribe((result) => {
        expect(result).toBeTruthy(); // Customize based on your API response
      });

    const req = httpMock.expectOne(
      `${service['apiUrl']}/update/${experienceId}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush({}); // Simulate a successful response

    tick();
  }));

  it('should delete experience', fakeAsync(() => {
    const experienceId = '1';

    service.deleteExperience(experienceId).subscribe((result) => {
      expect(result).toBeTruthy(); // Customize based on your API response
    });

    const req = httpMock.expectOne(
      `${service['apiUrl']}/delete/${experienceId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({}); // Simulate a successful response

    tick();
  }));
});
