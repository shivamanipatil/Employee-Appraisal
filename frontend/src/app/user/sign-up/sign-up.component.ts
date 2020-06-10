import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  
  registerUserData = {
    name: '',
    email: '',
    password: '',
    role: "employee",
    manager : "5edf64ba806a7b762e7dfdd0"
  }
  
  constructor(private _auth: AuthService,
              private _router: Router) { }
  ngOnInit(): void {
  }
  
  registerUser() {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this._router.navigate(['/'])
      },
      err => console.log(err)
    )
  }
}
