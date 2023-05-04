import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-course-vedio',
  templateUrl: './my-course-vedio.component.html',
  styleUrls: ['./my-course-vedio.component.scss']
})
export class MyCourseVedioComponent implements OnInit {
  resourceFile: boolean = false;
  sideBar : boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  resource(){
    this.resourceFile = !this.resourceFile
  }

  sideBarClose() {
    this.sideBar = !this.sideBar
  }

}
