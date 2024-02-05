import { Component, ElementRef, ViewChild } from '@angular/core';
import { Experience } from 'src/app/shared/models/experience.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ExperienceService } from 'src/app/shared/services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  constructor(
    public authService: AuthService,
    private experienceService: ExperienceService
  ) {}

  ngOnInit(): void {
    this.fetchExperiences(); // Call getExperiences during component initialization
  }

  experiences: Experience[] = [];
  loading = true;
  showAddForm = false;
  newExperience: Experience = {
    _id: '',
    title: '',
    startDate: '',
    endDate: '',
    skills: '',
    description: '',
  };

  editIndex: number | null = null;

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.editIndex = null;
  }

  addExperience() {
    if (this.editIndex !== null) {
      console.log('inside edit');
      this.experienceService
        .updateExperience(
          this.experiences[this.editIndex]._id,
          this.newExperience
        )
        .subscribe({
          next: () => {
            this.fetchExperiences(); // Fetch updated experiences after updating
            console.log('Experience updated successfully');
          },
          error: (error) => {
            console.error('Error updating experience:', error);
          },
        });
    } else {
      this.experienceService.addExperience(this.newExperience).subscribe({
        next: () => {
          this.fetchExperiences(); // Fetch updated experiences after adding
          console.log('Experience added successfully');
        },
        error: (error) => {
          console.error('Error adding experience:', error);
        },
      });
    }

    this.showAddForm = false;
    this.editIndex = null;
    this.newExperience = {
      _id: '',
      title: '',
      startDate: '',
      endDate: '',
      skills: '',
      description: '',
    };
    this.addEditButtonText = 'Add Experience';
  }

  addEditButtonText = 'Add Experience';
  @ViewChild('experienceForm') formElement: ElementRef | undefined;

  ngAfterViewInit(): void {
    if (this.showAddForm && this.formElement) {
      this.formElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  editExperience(index: number) {
    this.editIndex = index;
    this.newExperience = { ...this.experiences[index] };
    console.log(this.newExperience, 'edit', index);
    this.showAddForm = true;
    this.addEditButtonText = 'Edit Experience';

    if (this.formElement) {
      const navbarHeight = 130;
      const scrollPosition =
        this.formElement.nativeElement.offsetTop - navbarHeight;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  }

  deleteExperience(index: number) {
    const experienceId = this.experiences[index]._id;

    this.experienceService.deleteExperience(experienceId).subscribe({
      next: () => {
        this.fetchExperiences(); // Fetch updated experiences after deleting
        console.log('Experience deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting experience:', error);
      },
    });
  }

  private fetchExperiences() {
    this.experienceService.getExperiences().subscribe({
      next: (data) => {
        this.experiences = data;
        console.log('Experiences fetched successfully');
        this.loading = false;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching experiences:', error);
      },
    });
  }
}
