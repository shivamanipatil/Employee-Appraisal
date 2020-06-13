import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from './reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  empName: string = '';
  id: string = ''; 
  name: string = '';
  ratings: Array<Number> = new Array(5).fill(0);
  constructor(private route: ActivatedRoute,
              private _review: ReviewsService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    let empName = this.route.snapshot.paramMap.get('name');
    this.id = id;
    this.empName = empName;
  }
    
  postReview() { 
    this._review.postReview({
      name: this.name,
      ratings: this.ratings,
      employee: this.id
    })
    .subscribe(
      res => {
        console.log(res)
      },
      err => console.log(err)
    )
  }

}
