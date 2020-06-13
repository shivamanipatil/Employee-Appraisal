import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  profile = {
    name: '',
    age: 0,
    role: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    _id: '',
    managerName: ''
  }
  constructor(private _profileService: ProfileService,
              private router: Router) { }

  ngOnInit(): void {
    this._profileService.getProfile()
    .subscribe(
      res => { 
        const resM = res 
        delete resM.__v
        this.profile = resM
        console.log(this.profile)
      },
      err => console.log(err)
    )
  }
  
  isEmployee(): boolean {
    return this.profile.role === "employee";
  }
  isManager(): boolean {
    return !this.isEmployee();
  }
  
  onSelect(id: string, name: string): void {
    this.router.navigate(['/reviews', id, name]);
  }

}
