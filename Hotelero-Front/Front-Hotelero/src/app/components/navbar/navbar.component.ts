import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  identity: any


  constructor(
    private router: Router,
    private userRest: UserRestService
  ) { }

  ngOnInit(): void {
    this.identity = this.userRest.getIdentity().role;
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    this.router.navigateByUrl('/login')
  }

}
