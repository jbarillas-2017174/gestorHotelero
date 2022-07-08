import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userM: UserModel;

  constructor(
    private userRest: UserRestService,
    private router: Router
  ) {
    this.userM = new UserModel('', '', '', '', '', 'CLIENT', '');
  }

  ngOnInit(): void {
  }

  register(registerForm: any) {
    this.userRest.register(this.userM).subscribe({
      next: (response: any) => {
        alert(response.message);
        return this.router.navigateByUrl('/login');
      },
      error: (err) => {
        registerForm.reset();
        return alert(err.error.message || err.error)
      }
    })
  }
}
