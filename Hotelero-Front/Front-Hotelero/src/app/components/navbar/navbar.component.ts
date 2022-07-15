import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('identity');
      this.router.navigateByUrl('/login');
    } catch (err) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'error',
        showConfirmButton: false,
        timer: 1000
      });
    }
  }

}
