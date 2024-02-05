import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Project } from 'src/app/shared/models/project.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  constructor(
    public authService: AuthService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.fetchProjects(); // Call getProjects during component initialization
  }

  projects: Project[] = [];
  loading = true;
  showAddForm = false;
  newProject: Project = {
    _id: '',
    image: '',
    title: '',
    category: '',
    description: '',
    link: '',
  };

  editIndex: number | null = null;

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.editIndex = null;
  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.newProject.image = reader.result as string;
      };
      reader.readAsDataURL(file);
      console.log(this.newProject.image.length);
    }
  }

  addProject() {
    if (this.editIndex !== null) {
      this.projectService
        .updateProject(this.projects[this.editIndex]._id, this.newProject)
        .subscribe({
          next: () => {
            this.fetchProjects(); // Fetch updated projects after updating
            console.log('Project updated successfully');
          },
          error: (error) => {
            console.error('Error updating project:', error);
          },
        });
    } else {
      this.projectService.addProject(this.newProject).subscribe({
        next: () => {
          this.fetchProjects(); // Fetch updated projects after adding
          console.log('Project added successfully');
        },
        error: (error) => {
          console.error('Error adding project:', error);
        },
      });
    }

    this.showAddForm = false;
    this.editIndex = null;
    this.newProject = {
      _id: '',
      image: '',
      title: '',
      category: '',
      description: '',
      link: '',
    };
    this.addEditButtonText = 'Add Project';
  }

  addEditButtonText = 'Add Project';
  @ViewChild('portfolioForm') formElement: ElementRef | undefined;

  ngAfterViewInit(): void {
    if (this.showAddForm && this.formElement) {
      this.formElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  editProject(index: number) {
    this.editIndex = index;
    this.newProject = { ...this.projects[index] };
    console.log(this.newProject, 'edit', index);
    this.showAddForm = true;
    this.addEditButtonText = 'Edit Project';

    if (this.formElement) {
      const navbarHeight = 130;
      const scrollPosition =
        this.formElement.nativeElement.offsetTop - navbarHeight;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  }

  deleteProject(index: number) {
    const projectId = this.projects[index]._id;

    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        this.fetchProjects(); // Fetch updated projects after deleting
        console.log('Project deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting project:', error);
      },
    });
  }

  private fetchProjects() {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        console.log('Projects fetched successfully');
        this.loading = false;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      },
    });
  }
}
