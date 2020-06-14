import { Component, OnInit } from '@angular/core';
import { EmployeeListService } from './employee-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  
  employees = [
    {
      name: "",
      email: "",
      _id: ""
    }
  ]
  constructor(private _employeeList: EmployeeListService,
              private router: Router) { }

  ngOnInit(): void {
    this._employeeList.getSubordinates()
    .subscribe(
      res => { 
        this.employees = res
        console.log(this.employees)
      },
      err => console.log(err)
    )
  }
  
  onSelect(id: string, name: string): void {
    this.router.navigate(['/reviews/create',id, name]);
  }

}
