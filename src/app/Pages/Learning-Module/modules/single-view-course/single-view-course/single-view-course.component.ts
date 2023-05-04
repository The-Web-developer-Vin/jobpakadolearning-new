import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { courseService } from 'src/app/Pages/shared/services/courses/courses.service';

@Component({
  selector: 'app-single-view-course',
  templateUrl: './single-view-course.component.html',
  styleUrls: ['./single-view-course.component.scss'],
})
export class SingleViewCourseComponent implements OnInit {
  slidetogglers: any = {};
  counter = 95;
  showTxt = 'Show More';
  last_index = 100;
  firstCount = 180;
  presentTab: any = 'Personal';
  tabs: any = {
    Personal: true,
    Teams: false,
  };
  reportBlock: boolean = false;
  id: any;
  webDevolpmentData: any;
  youWillLearnData: any;
  courseIncludesData: any;
  courseContent: any;
  requerementsData: any;
  descriptionData: any;
  lecture: any;
  lectureTitleData: any = [];
  clickedIndexOpen: boolean = false;
  clickedIndex: any;
  clicked: boolean = false;
  ratingsData: any;
  mainRatingData: any;
  rating: any;
  showMore = false;
  selectedFaq: any = -1;
  videoModel: boolean = false;
  modelData: any = [];
  videorl: any = '';
  isActive: any;
  @ViewChild('OutSideClick') OutSideClick!: ElementRef;
  whatUwillLearn: any;
  courseDesrciption: any;
  requerementDesrciption: any;
  singleCourseData: any;
  singleCoursetitle: any;
  courseData: any;
  index: any;
  constructor(
    private route: ActivatedRoute,
    private courseService: courseService,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.selectedFaq = 0;
    //   this.renderer.listen('window', 'click',(e:Event)=>{
    //     if(e.target !== this.OutSideClick.nativeElement){
    //         this.videoModel=true;
    //     }
    // });
  }

  ngOnInit(): void {
    this.clickedIndex = false;
    this.clicked = false;
    this.route.paramMap.subscribe((data: any) => (this.id = data.params.id));
    console.log('id', this.id);
    // this.router.events.subscribe( (event: any) => {
    //   this.router.navigate(['/']);
    //   if(event.url.startsWith('/index/')){
    //     console.log("id is %s", event.id);
    //     //this.router.navigate(['/']);
    //   }

    // });
    this.gatAllCorsesData();
    this.getRatingsData();
    this.getSingleCourseData();
  }

  menuTabs(tab: any) {
    this.presentTab = tab;
    console.log('tab', tab);
    (this.tabs.Personal = tab == 'personals' ? true : false),
      (this.tabs.Teams = tab == 'teams' ? true : false);
    // this.spinner.hide();
  }

  toggleSkil() {
    //   let active = this.coursetogglers[position]
    //   ? !this.coursetogglers[position]
    //   : true;
    // for (const [key, value] of Object.entries(this.coursetogglers)) {
    //   this.coursetogglers[key] = false;
    // }
    // this.coursetogglers[position] = active;
    if (this.counter < 201) {
      this.counter = this.info.length;
      this.showTxt = 'Show less';
    } else {
      this.counter = this.last_index;
      this.showTxt = 'Show More';
    }
  }

  SlideDown(position: any) {
    let active = this.slidetogglers[position]
      ? !this.slidetogglers[position]
      : true;
    for (const [key, value] of Object.entries(this.slidetogglers)) {
      this.slidetogglers[key] = false;
    }
    this.slidetogglers[position] = active;

    if (!this.clicked) {
      this.clicked = true;
    } else {
      this.clicked = false;
    }
  }

  // SlideDown(): void {
  //   if (!this.clicked) {
  //     this.clicked = true
  //   }
  //   else {
  //     this.clicked = false
  //   }
  // }
  // }

  report() {
    this.reportBlock = !this.reportBlock;
  }

  info =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";

  gatAllCorsesData() {
    this.courseService.getAllSingleViewCourse(this.id).subscribe(
      (res: any) => {
        console.log('singleCourse res ===>', res);
        this.webDevolpmentData = res.data.course;
        this.rating = res.data.webDevolpmentData;
        this.youWillLearnData = res.data.course.whatUwillLearn;
        this.courseData = res.data.course;
        // res.data.course.whatUwillLearn.forEach((element:any) => {
        //   console.log("element",element)
        // });

        this.courseIncludesData = res.data.course.courseIncludes;
        // res.data.course.courseIncludes.forEach((element: any) => {
        //   this.courseDesrciption = element.description;
        // });
        this.courseContent = res.data.course.courseContent;
        res.data.course.courseContent.forEach((element: any) => {
          this.lecture = element.section.lecture;
          this.lectureTitleData.push(element);
        });
        this.requerementsData=res.data.course.requirements;
        // res.data.course.requirements.forEach((element: any) => {
        //   this.requerementsData = element.description;
        // });
        this.descriptionData = res.data.course.description;
      },
      (err: any) => {
        console.log('singleCourses err===>', err);
      }
    );
  }

  getDetails(i: any) {
    this.clickedIndex = this.clickedIndex === i ? undefined : i;
    this.clickedIndexOpen = this.clickedIndexOpen ? true : false;
    console.log('this.clickedIndex', this.clickedIndex);
  }

  getRatingsData() {
    this.courseService.getRatingsData(this.id).subscribe(
      (res: any) => {
        console.log('ratingsData res', res);
        this.ratingsData = res.data;
        this.mainRatingData = res.courseRate;
      },
      (err: any) => {
        console.log('ratingData err', err);
      }
    );
  }
  openAccordionFaq(i: any) {
    if (this.selectedFaq === i) {
      this.selectedFaq = -1;
    } else {
      this.selectedFaq = i;
    }
  }
  showVideo(data: any, lecture: any) {
    console.log('data', data);
    console.log('lecture', lecture);
    this.modelData = lecture;
    this.videoModel = true;
    this.videorl = data.lecture;
  }
  closeModel() {
    this.videoModel = false;
  }
  showModelVideo(video: any) {
    this.isActive = video.lectureTitle;
    this.videorl = video?.lecture;
  }
  getSingleCourseData() {
    this.courseService.getAllCoursesData().subscribe(
      (res: any) => {
        console.log('single Course res************', res);
        this.singleCourseData = res.data.course;

        console.log(
          'this.singleCourseData************',
          this.singleCourseData,
          this.id
        );
        let index = this.singleCourseData.findIndex(
          (course: any) => course._id == this.id
        );
        console.log('index', index);
        this.singleCourseData.splice(index, 1);
        // res.data.course.forEach((element:any,index:any) => {
        //   console.log("index",index)
        //   if(index==1){
        //   }
        // });
      },
      (err: any) => {
        console.log('single course err', err);
      }
    );
  }
}
