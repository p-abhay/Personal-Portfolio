import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Personal Portfolio';
  constructor(private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
