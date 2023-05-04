import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { courseService } from 'src/app/Pages/shared/services/courses/courses.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  presentTab: any = "deposits";
  tabs: any = {
    Publish: true,
    Pending: false,
    Draft:false
  };
  myCourseData: any;
  constructor(private courseService:courseService) { }

  ngOnInit(): void {
    this.myCourseGetAll();
  }
  menuTabs(tab:any) {
    this.presentTab = tab;
    console.log("tab", tab);
    (this.tabs.Publish = tab == "publish" ? true : false),
      (this.tabs.Pending = tab == "pending" ? true : false),
      (this.tabs.Draft = tab == "draft" ? true : false)
    // this.spinner.hide();
  }

  myCourseGetAll(){
    this.courseService.getMyCourseByUserId().subscribe((res:any)=>{
      console.log("myCourse res",res);
      this.myCourseData=res.data.data;
    },(err:any)=>{
      console.log("myCourse err",err)
    })
  }

}
