import { Component, OnInit } from '@angular/core';
import { ManagerListService } from './manager-list.service';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.scss']
})
export class ManagerListComponent implements OnInit {
  
  managers = [{
    name: '',
    _id: ''
  }]
  constructor(private _managerService: ManagerListService) { }

  ngOnInit(): void {
    this._managerService.getMangers()
    .subscribe(
      res => { 
        this.managers = res
        console.log(this.managers)
      },
      err => console.log(err)
    )
  }
  
  addManager(managerId) {
    this._managerService.addManager({
      managerId,  
    })
    .subscribe(
      res => {
        console.log(res)
      },
      err => console.log(err)
    )
  }

}
