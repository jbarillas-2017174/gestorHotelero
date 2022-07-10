import { Component, OnInit } from '@angular/core';
import { HomeRestService } from 'src/app/services/homeRest/home-rest.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hotels:any

  constructor(
    private homeRest: HomeRestService
  ) { }

  ngOnInit(): void {
    this.getHotelsView();
  }

  getHotelsView(){
    this.homeRest.getHotels().subscribe({
      next: (res:any)=> this.hotels = res.hotels,
      error: (err)=> alert(err.error.message)
    })
  }

}
