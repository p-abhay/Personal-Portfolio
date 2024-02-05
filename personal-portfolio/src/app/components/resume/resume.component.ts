import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent implements OnInit {
  title = 'Resume - Download';
  constructor(private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  showError = false;
  errorMessage = '';

  // Function to handle iframe error
  handleError() {
    this.showError = true;
    this.errorMessage =
      'Failed to load the resource. The server responded with a rate limit exceeded error.Download the file instead';
  }
  downloadPDF(fileId: string): void {
    const downloadLink = document.createElement('a');
    downloadLink.href = `https://drive.google.com/uc?export=download&id=${fileId}`;
    downloadLink.target = '_blank';
    downloadLink.download = 'your_file_name.pdf'; // Set a preferred file name

    // Triggering the download
    downloadLink.click();
  }
}
