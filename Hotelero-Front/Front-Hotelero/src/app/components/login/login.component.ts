import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userM: UserModel;

  constructor(
    private userRest: UserRestService,
    private router: Router
  ) { 
    this.userM = new UserModel('','','','','','','')
  }

  ngOnInit(): void {
  }

  login(loginForm:any){
    this.userRest.login(this.userM).subscribe({
      next: (res:any)=>{
        alert(res.message);
        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(res.already));
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        loginForm.reset();
        return alert(err.error.message || err.error)
      }
    })
  }

}

