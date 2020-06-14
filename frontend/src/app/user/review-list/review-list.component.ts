import { Component, OnInit } from '@angular/core';
import { ReviewListService } from './review-list.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  
  id: string = '';
  reviews: Array<object> = [{
    name: "",
    email: "",
    _id: "",
    ratings: [],
    employeeName: '',
    designation: '',
  }];
  constructor(private _reviewList: ReviewListService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    this._reviewList.getReviews()
    .subscribe(
      res => {
        this.reviews = res
        console.log(this.reviews)
      },
      err => console.log(err)
    )
  }
  
  canEdit(givenById): boolean {
    return this.id === givenById
  }
  updateReview(id, employeeName) {
    this.router.navigate(['/reviews/update', id, employeeName])
  }
  deleteReview(id) {
    this._reviewList.deleteReviews(id)
    .subscribe(
      res => {
        console.log(res)
        window.location.reload();
      },
      err => console.log(err)
    )  
  }
}
