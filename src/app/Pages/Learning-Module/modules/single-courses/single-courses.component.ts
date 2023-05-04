import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { courseService } from 'src/app/Pages/shared/services/courses/courses.service';

@Component({
  selector: 'app-single-courses',
  templateUrl: './single-courses.component.html',
  styleUrls: ['./single-courses.component.scss']
})
export class SingleCoursesComponent implements OnInit {
  categorieId: any;
  categorieIdData: any;
  courseListId: any;
  corseCategorieData: any;
id:any
  constructor(private courseServices:courseService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getAllCoursesData();
    // this.categorioesGetById()
    // this.courseListData();

    this.route.paramMap.subscribe((data: any) => (this.id = data.params.id));
    console.log("id", this.id);
    this.courseServices.categorieGetById(this.id).subscribe((res:any)=>{
      console.log("categorieGetById res",res);
      this.corseCategorieData=res.data.data;
    },(err:any)=>{
      console.log("categorieGetById err",err)
    })
  }

  getAllCoursesData(){
    this.courseServices.getAllCourses().subscribe((res:any)=>{
      console.log("courses res",res);
      this.categorieIdData=res.data.data;
    //  res.data.data.forEach((element:any) => {
    //       this.corseCategorieData=element;
    //     });
      // console.log("this.categorieId",this.categorieId);
    },(err:any)=>{
      console.log("courses err",err)
    })
  }


  // courseListData(){
  //   this.courseServices.getCourseList().subscribe((res:any)=>{
  //     console.log("courseList res",res);
  //     res.data.course.forEach((element:any) => {
  //       this.courseListId=element.courseCategory
  //     });
   
  //   },(err:any)=>{
  //     console.log("courseList err",err)
  //   })
  // }

//   categorioesGetById(){
//      // console.log("this.courseListId",this.courseListId);
//       this.courseServices.categorieGetById(this.id).subscribe((res:any)=>{
//         console.log("categorieGetById res",res);
//         // this.corseCategorieData=res.data.data;
//         // res.data.data.forEach((element:any) => {
//         //   this.corseCategorieData=element.title;
//         // });
//       },(err:any)=>{
//         console.log("categorieGetById err",err)
//       })
   
// }
}