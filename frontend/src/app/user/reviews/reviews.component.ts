import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from './reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  newReview: boolean = true;
  empName: string = '';
  id: string = ''; 
  name: string = '';
  ratings: Array<Number> = new Array(5).fill(0);
  constructor(private route: ActivatedRoute,
              private _review: ReviewsService,
              private _router: Router) { }

  ngOnInit(): void {
    //id is review id when updating and employee id when creating
    let id = this.route.snapshot.paramMap.get('id');
    let type = this.route.snapshot.paramMap.get('type');
    let empName = this.route.snapshot.paramMap.get('name');
    this.newReview = type === 'create'
    this.id = id;
    this.empName = empName;
  }
    
  postReview() { 
    this._review.postReview({
      name: this.name,
      ratings: this.ratings,
      employee: this.id,
      employeeName: this.empName
    })
    .subscribe(
      res => {
        console.log(res)
      },
      err => {
        window.alert("Name is required.");
        console.log(err);
      }
    )
      this._router.navigate(['/profile'])
  }
  
  updateReview() {
    this._review.updateReview({
      name: this.name,
      ratings: this.ratings,
    }, this.id)
    .subscribe(
      res => {
        console.log(res)
      },
      err => {
        window.alert("Name is required.");
        console.log(err);
      }
    )
    this._router.navigate(['/profile'])
  } 
}
